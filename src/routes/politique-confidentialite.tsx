import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Action Désembouage" },
      { name: "description", content: "Politique de confidentialité d'Action Désembouage : données collectées, finalités, durée de conservation, droits RGPD." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Politique de confidentialité — Action Désembouage" },
      { property: "og:description", content: "Comment nous collectons et utilisons vos données personnelles." },
    ],
  }),
  component: PolitiqueConfidentialite,
});

function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link to="/" className="text-sm text-blue-secondary hover:underline">← Retour à l'accueil</Link>
        <h1 className="mt-6 text-4xl font-extrabold text-navy">Politique de confidentialité</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour&nbsp;: {new Date().toLocaleDateString("fr-FR")}</p>

        <div className="prose prose-navy mt-10 space-y-8 text-navy/85 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est{" "}
              <strong>Action Désembouage</strong>, joignable à l'adresse&nbsp;:{" "}
              <a className="text-blue-secondary hover:underline" href="mailto:contact@actiondesembouage.fr">
                contact@actiondesembouage.fr
              </a>{" "}
              ou par téléphone au 07 59 75 02 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">2. Données collectées</h2>
            <p>Via le formulaire de demande de devis, nous collectons les informations suivantes&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale (facultative)</li>
              <li>Type de client (particulier ou professionnel)</li>
              <li>Type d'installation concernée</li>
              <li>Contenu de votre message</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">3. Finalités du traitement</h2>
            <p>Les données collectées sont utilisées exclusivement pour&nbsp;:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Répondre à votre demande de devis ou de renseignements&nbsp;;</li>
              <li>Établir un devis personnalisé&nbsp;;</li>
              <li>Vous recontacter dans le cadre d'une éventuelle prestation&nbsp;;</li>
              <li>Assurer le suivi commercial et administratif.</li>
            </ul>
            <p>
              Le fondement juridique du traitement est l'exécution de mesures précontractuelles prises
              à votre demande (art. 6.1.b du RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">4. Destinataires</h2>
            <p>
              Vos données sont destinées uniquement à Action Désembouage. Elles ne sont ni vendues,
              ni cédées à des tiers à des fins commerciales. Elles peuvent être hébergées chez notre
              prestataire technique (hébergeur du site) pour les seuls besoins du fonctionnement du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">5. Durée de conservation</h2>
            <p>
              Les données sont conservées le temps nécessaire au traitement de votre demande, puis
              archivées pendant une durée maximale de 3 ans à des fins de prospection et de suivi
              commercial, sauf demande de suppression de votre part.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">6. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez d'un droit&nbsp;:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>d'accès à vos données&nbsp;;</li>
              <li>de rectification&nbsp;;</li>
              <li>d'effacement (droit à l'oubli)&nbsp;;</li>
              <li>de limitation du traitement&nbsp;;</li>
              <li>d'opposition&nbsp;;</li>
              <li>à la portabilité de vos données.</li>
            </ul>
            <p>
              Vous pouvez exercer ces droits en écrivant à{" "}
              <a className="text-blue-secondary hover:underline" href="mailto:contact@actiondesembouage.fr">
                contact@actiondesembouage.fr
              </a>. En cas de difficulté, vous pouvez introduire une réclamation auprès de la CNIL (
              <a className="text-blue-secondary hover:underline" href="https://www.cnil.fr" target="_blank" rel="noreferrer">
                www.cnil.fr
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">7. Cookies</h2>
            <p>
              Le site n'utilise pas de cookies de traçage publicitaire. Seuls des cookies techniques
              strictement nécessaires au bon fonctionnement du site peuvent être déposés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">8. Sécurité</h2>
            <p>
              Action Désembouage met en œuvre les mesures techniques et organisationnelles adaptées
              afin de protéger vos données contre tout accès, altération ou divulgation non autorisés.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
