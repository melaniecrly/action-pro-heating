# Action Désembouage — Export statique (IONOS)

Version 100 % statique du site pour un hébergement mutualisé IONOS Web Hosting Plus, indépendante du projet Lovable principal.

## Stack
- Vite 6 + React 19
- React Router DOM v7 (SPA)
- Tailwind CSS v4 (@tailwindcss/vite)
- react-helmet-async (SEO par page)
- Formulaire relié à `mail.php` (PHP natif, `mail()`)

## Build

```bash
cd static-export
npm install       # ou pnpm / bun install
npm run build
```

Le dossier `dist/` est produit à la racine de `static-export/`.

## Déploiement IONOS

1. Uploadez **tout le contenu** de `dist/` à la racine web (`/`) de l'hébergement.
2. Uploadez également, **à la racine web** :
   - `public/.htaccess` (fallback SPA + cache)
   - `public/mail.php` (traitement du formulaire)

Note : `vite build` copie automatiquement le contenu de `public/` dans `dist/`, donc `.htaccess` et `mail.php` seront présents dans `dist/` après build. Un simple upload de `dist/*` suffit.

## Formulaire de devis

`mail.php` envoie un email à `contact@actiondesembouage.fr` via `mail()` (fonctionne nativement sur IONOS Web Hosting Plus).

- L'expéditeur (`From`) est `no-reply@<votre-domaine>` pour respecter SPF/DKIM.
- L'adresse du visiteur est mise en `Reply-To`, donc "Répondre" écrit directement au client.
- Honeypot anti-spam + validation serveur.

Vérifiez après déploiement que la boîte `contact@actiondesembouage.fr` existe bien chez IONOS (ou est redirigée).

## Routes

- `/` — Page d'accueil
- `/mentions-legales`
- `/politique-confidentialite`

Le `.htaccess` renvoie toutes les routes inconnues vers `index.html` (SPA).
