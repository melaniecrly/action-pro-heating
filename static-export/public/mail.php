<?php
// mail.php — Réception du formulaire de devis Action Désembouage
// Déployer à la racine du site sur IONOS Web Hosting Plus.

header('Content-Type: application/json; charset=utf-8');

// --- CORS : même origine uniquement ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host   = $_SERVER['HTTP_HOST']   ?? '';
if ($origin && parse_url($origin, PHP_URL_HOST) !== $host) {
    http_response_code(403);
    echo json_encode(['error' => 'Origine non autorisée']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// --- Lecture JSON ou form-data ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { $data = $_POST; }

// --- Honeypot anti-spam ---
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]); // silencieux
    exit;
}

// --- Récupération / nettoyage ---
function clean($v, $max = 500) {
    $v = is_string($v) ? trim($v) : '';
    $v = strip_tags($v);
    return mb_substr($v, 0, $max);
}

$nom          = clean($data['nom']          ?? '', 100);
$prenom       = clean($data['prenom']       ?? '', 100);
$telephone    = clean($data['telephone']    ?? '', 40);
$email        = clean($data['email']        ?? '', 200);
$adresse      = clean($data['adresse']      ?? '', 300);
$type_client  = clean($data['type_client']  ?? '', 50);
$type_install = clean($data['type_install'] ?? '', 80);
$message      = clean($data['message']      ?? '', 4000);

// --- Validation minimale ---
$errors = [];
if ($nom === '')       $errors[] = 'nom requis';
if ($prenom === '')    $errors[] = 'prénom requis';
if ($telephone === '') $errors[] = 'téléphone requis';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email invalide';

if ($errors) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit;
}

// --- Prévention injection d'en-têtes ---
if (preg_match("/[\r\n]/", $email . $nom . $prenom)) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

// --- Construction du mail ---
$to       = 'contact@actiondesembouage.fr';
$subject  = "Nouvelle demande de devis — {$prenom} {$nom}";

$body  = "Nouvelle demande de devis via actiondesembouage.fr\n";
$body .= str_repeat('-', 60) . "\n\n";
$body .= "Nom             : {$nom}\n";
$body .= "Prénom          : {$prenom}\n";
$body .= "Téléphone       : {$telephone}\n";
$body .= "Email           : {$email}\n";
$body .= "Adresse         : {$adresse}\n";
$body .= "Type de client  : {$type_client}\n";
$body .= "Installation    : {$type_install}\n\n";
$body .= "Message :\n{$message}\n\n";
$body .= str_repeat('-', 60) . "\n";
$body .= "Envoyé le " . date('d/m/Y à H:i') . "\n";

// L'expéditeur DOIT être une adresse @ votre domaine chez IONOS,
// sinon le mail est rejeté (SPF/DKIM). On met le client en Reply-To.
$fromDomain = preg_replace('/^www\./', '', $host);
$from = "no-reply@{$fromDomain}";

$headers  = "From: Action Désembouage <{$from}>\r\n";
$headers .= "Reply-To: {$prenom} {$nom} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if (!$ok) {
    http_response_code(500);
    echo json_encode(['error' => "Envoi impossible. Merci d'appeler le 07 59 75 02 18."]);
    exit;
}

echo json_encode(['ok' => true]);
