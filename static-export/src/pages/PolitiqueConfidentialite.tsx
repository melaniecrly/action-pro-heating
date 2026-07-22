import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Politique de confidentialité — Action Désembouage</title>
        <meta name="description" content="Politique de confidentialité d'Action Désembouage : données collectées, finalités, durée de conservation, droits RGPD." />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Politique de confidentialité — Action Désembouage" />
        <meta property="og:description" content="Comment nous collectons et utilisons vos données personnelles." />
      </Helmet>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link to="/" className="text-sm text-blue-secondary hover:underline">← Retour à l'accueil</Link>
        <h1 className="mt-6 text-4xl font-extrabold text-navy">Politique de confidentialité</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour&nbsp;: {new Date().toLocaleDateString("fr-FR")}</p>

        <div className="prose prose-navy mt-10 space-y-8 text-navy/85 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy">1. Responsable du traitement</h2>
            <p>Action Désembouage — <a className="text-blue-secondary hover:underline" href="mailto:contact@actiondesembouage.fr">contact@actiondesembouage.fr</a> — 07 59 75 02 18.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">2. Données collectées</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale (facultative)</li>
              <li>Type de client, type d'installation</li>
              <li>Contenu de votre message</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">3. Finalités</h2>
            <p>Répondre à votre demande de devis, établir un devis, assurer le suivi commercial. Base légale : mesures précontractuelles (art. 6.1.b RGPD).</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">4. Destinataires</h2>
            <p>Vos données sont destinées uniquement à Action Désembouage. Elles ne sont ni vendues ni cédées à des tiers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">5. Durée de conservation</h2>
            <p>Conservation le temps du traitement, puis archivage jusqu'à 3 ans, sauf demande de suppression.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">6. Vos droits</h2>
            <p>Droits d'accès, rectification, effacement, limitation, opposition et portabilité. Exercice à <a className="text-blue-secondary hover:underline" href="mailto:contact@actiondesembouage.fr">contact@actiondesembouage.fr</a>. Réclamation possible auprès de la CNIL.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-navy">7. Cookies</h2>
            <p>Le site n'utilise pas de cookies de traçage publicitaire.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
