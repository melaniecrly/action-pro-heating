<?php
/**
 * mail.php — Formulaire de contact / demande de devis
 * Action Désembouage — Compatible IONOS Web Hosting Plus (PHP 8.x)
 *
 * ------------------------------------------------------------------
 *  ➜ Pour changer le destinataire, modifiez UNIQUEMENT la ligne ci-dessous :
 * ------------------------------------------------------------------
 */
const RECIPIENT_EMAIL = 'contact@actiondesembouage.fr';
const RECIPIENT_NAME  = 'Action Désembouage';
// ------------------------------------------------------------------

declare(strict_types=1);

// --- Réponse toujours en JSON ---
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

/**
 * Renvoie une réponse JSON et termine le script.
 */
function respond(int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

// --- 1. Méthode HTTP ---
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Méthode non autorisée.']);
}

// --- 2. Protection CSRF simple : même origine ---
$host   = $_SERVER['HTTP_HOST']   ?? '';
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    if ($originHost && strcasecmp($originHost, $host) !== 0) {
        respond(403, ['ok' => false, 'error' => 'Origine non autorisée.']);
    }
}

// --- 3. Lecture des données (JSON ou form-data) ---
$raw  = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// --- 4. Anti-spam : honeypot ---
// Si le champ "website" (caché par CSS) est rempli => bot silencieusement rejeté.
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}

/**
 * Nettoie une chaîne : trim + suppression HTML + normalisation unicode + coupe.
 * Interdit également les caractères de contrôle (CR/LF) — protection anti-injection d'en-têtes.
 */
function clean_input(mixed $value, int $maxLength = 500): string {
    if (!is_string($value)) return '';
    $v = trim($value);
    $v = strip_tags($v);
    // Supprime tous les caractères de contrôle (dont \r \n \t verticaux) sauf \n \t
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $maxLength);
}

/**
 * Vérifie qu'une chaîne ne contient AUCUN saut de ligne (protection en-têtes mail).
 */
function is_header_safe(string $value): bool {
    return !preg_match('/[\r\n]/', $value);
}

// --- 5. Récupération et nettoyage ---
$nom          = clean_input($data['nom']          ?? '', 100);
$prenom       = clean_input($data['prenom']       ?? '', 100);
$telephone    = clean_input($data['telephone']    ?? '', 40);
$email        = clean_input($data['email']        ?? '', 200);
$adresse      = clean_input($data['adresse']      ?? '', 300);
$type_client  = clean_input($data['type_client']  ?? '', 60);
$type_install = clean_input($data['type_install'] ?? '', 80);
$message      = clean_input($data['message']      ?? '', 4000);

// --- 6. Validation ---
$errors = [];
if ($nom === '')                                    $errors[] = 'Le nom est requis.';
if ($prenom === '')                                 $errors[] = 'Le prénom est requis.';
if ($telephone === '')                              $errors[] = 'Le téléphone est requis.';
if (!preg_match('/^[\d\s().+\-]{6,40}$/', $telephone)) {
    $errors[] = 'Le numéro de téléphone semble invalide.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL))     $errors[] = 'L\'adresse email est invalide.';

// Anti-injection d'en-têtes
foreach ([$nom, $prenom, $email, $telephone, $adresse, $type_client, $type_install] as $field) {
    if (!is_header_safe($field)) {
        $errors[] = 'Données invalides détectées.';
        break;
    }
}

if (!empty($errors)) {
    respond(400, ['ok' => false, 'error' => implode(' ', $errors)]);
}

// --- 7. Anti-flood basique (1 envoi / 30s / IP) ---
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$flagFile = sys_get_temp_dir() . '/mailform_' . md5($ip);
if (is_file($flagFile) && (time() - (int) @filemtime($flagFile)) < 30) {
    respond(429, ['ok' => false, 'error' => 'Merci de patienter quelques secondes avant de renvoyer une demande.']);
}
@touch($flagFile);

// --- 8. Construction du corps du mail (texte brut) ---
$subject = "Nouvelle demande de devis — {$prenom} {$nom}";

$body  = "Nouvelle demande reçue via " . ($host ?: 'le site') . "\n";
$body .= str_repeat('-', 60) . "\n\n";
$body .= "Nom             : {$nom}\n";
$body .= "Prénom          : {$prenom}\n";
$body .= "Téléphone       : {$telephone}\n";
$body .= "Email           : {$email}\n";
$body .= "Adresse         : " . ($adresse !== '' ? $adresse : '—') . "\n";
$body .= "Type de client  : " . ($type_client !== '' ? $type_client : '—') . "\n";
$body .= "Installation    : " . ($type_install !== '' ? $type_install : '—') . "\n\n";
$body .= "Message :\n" . ($message !== '' ? $message : '(non renseigné)') . "\n\n";
$body .= str_repeat('-', 60) . "\n";
$body .= "Reçu le  : " . date('d/m/Y à H:i') . "\n";
$body .= "IP       : {$ip}\n";

// --- 9. En-têtes ---
// Sur IONOS, `From:` DOIT utiliser une adresse du domaine hébergé (SPF/DKIM),
// sinon le mail est rejeté. On utilise no-reply@<domaine> et on met le client en Reply-To.
$fromDomain = preg_replace('/^www\./i', '', $host ?: 'localhost');
$fromEmail  = 'no-reply@' . $fromDomain;

$fromName    = mb_encode_mimeheader(RECIPIENT_NAME, 'UTF-8', 'B');
$replyName   = mb_encode_mimeheader("{$prenom} {$nom}", 'UTF-8', 'B');
$subjectMime = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$headers = [];
$headers[] = "From: {$fromName} <{$fromEmail}>";
$headers[] = "Reply-To: {$replyName} <{$email}>";
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "Content-Transfer-Encoding: 8bit";
$headers[] = "X-Mailer: PHP/" . PHP_VERSION;

// --- 10. Envoi ---
$sent = @mail(
    RECIPIENT_EMAIL,
    $subjectMime,
    $body,
    implode("\r\n", $headers),
    '-f' . $fromEmail   // envelope sender (SPF)
);

if (!$sent) {
    respond(500, [
        'ok'    => false,
        'error' => "L'envoi a échoué. Merci de nous appeler au 07 59 75 02 18 ou d'écrire directement à " . RECIPIENT_EMAIL . ".",
    ]);
}

respond(200, [
    'ok'      => true,
    'message' => 'Votre demande a bien été transmise. Nous vous recontactons sous 24 h ouvrées.',
]);
