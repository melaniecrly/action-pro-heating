import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Action Désembouage" },
      { name: "description", content: "Mentions légales du site Action Désembouage : éditeur, hébergeur, responsabilité, propriété intellectuelle." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Mentions légales — Action Désembouage" },
      { property: "og:description", content: "Informations légales du site Action Désembouage." },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link to="/" className="text-sm text-blue-secondary hover:underline">← Retour à l'accueil</Link>
        <h1 className="mt-6 text-4xl font-extrabold text-navy">Mentions légales</h1>
        <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour&nbsp;: {new Date().toLocaleDateString("fr-FR")}</p>

        <div className="prose prose-navy mt-10 space-y-8 text-navy/85 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy">1. Éditeur du site</h2>
            <p>
              Le présent site internet est édité par <strong>Action Désembouage</strong>, entreprise
              spécialisée dans le désembouage de systèmes de chauffage.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Raison sociale&nbsp;: Action Désembouage</li>
              <li>Zone d'activité&nbsp;: Morbihan et Sud-Finistère</li>
              <li>Téléphone&nbsp;: 07 59 75 02 18</li>
              <li>Email&nbsp;: contact@actiondesembouage.fr</li>
              <li>SIRET, forme juridique et adresse du siège&nbsp;: <em>à compléter</em></li>
              <li>Directeur de la publication&nbsp;: <em>à compléter</em></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">2. Hébergeur</h2>
            <p>
              Le site est hébergé par <strong>Lovable</strong> (infrastructure cloud gérée). Pour toute
              question relative à l'hébergement, contactez l'éditeur du site à l'adresse indiquée ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments présents sur ce site (textes, images, logos, graphismes, mise en page)
              est protégé par le droit d'auteur et reste la propriété exclusive d'Action Désembouage,
              sauf mention contraire. Toute reproduction, représentation, modification ou exploitation
              totale ou partielle sans autorisation écrite préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">4. Responsabilité</h2>
            <p>
              Action Désembouage met tout en œuvre pour fournir des informations exactes et à jour.
              L'éditeur ne saurait toutefois être tenu responsable des erreurs, omissions, ou des
              résultats obtenus par un mauvais usage de ces informations. L'utilisation du site se fait
              sous la seule responsabilité de l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">5. Liens externes</h2>
            <p>
              Le site peut contenir des liens vers d'autres sites internet. Action Désembouage n'exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">6. Données personnelles</h2>
            <p>
              Les modalités de collecte et de traitement des données personnelles sont détaillées dans notre{" "}
              <Link to="/politique-confidentialite" className="text-blue-secondary hover:underline">
                politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">7. Droit applicable</h2>
            <p>
              Le présent site est soumis au droit français. En cas de litige, et à défaut d'accord amiable,
              les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
