# Guide de Demarrage Rapide

## Installation

```bash
cd fleuriste-site
npm install
```

## Configuration

### 1. Variables d'environnement

Copiez `.env.local.example` vers `.env.local` et configurez vos valeurs:

```bash
cp .env.local.example .env.local
```

Editez `.env.local` avec vos vraies valeurs.

### 2. Configuration Supabase

1. Creez un compte sur [supabase.com](https://supabase.com)
2. Creez un nouveau projet
3. Allez dans SQL Editor
4. Executez le script `supabase-schema.sql`
5. Copiez l'URL du projet et la cle anon dans `.env.local`

### 3. Configuration LemonSqueezy

1. Creez un compte sur [lemonsqueezy.com](https://lemonsqueezy.com)
2. Creez une boutique (Store)
3. Creez un produit pour chaque bouquet
4. Dans `data/bouquets.ts`, mettez a jour les IDs de produits LemonSqueezy
5. Generez une cle API dans Settings > API
6. Configurez un webhook:
   - URL: `https://votre-domaine.com/api/webhooks/lemonsqueezy`
   - Evenements: `order_created`, `order_refunded`
   - Copiez le secret du webhook

### 4. Images

Ajoutez vos images dans `public/images/`:
- Bouquets: `bouquet-*.jpg`
- Galerie: `galerie-1.jpg` a `galerie-9.jpg`
- Articles: `article-*.jpg`

Voir `public/placeholder.md` pour les details.

## Developpement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## Build et Deploiement

### Build local

```bash
npm run build
npm start
```

### Deploiement Vercel

1. Installez Vercel CLI: `npm i -g vercel`
2. Deployez: `vercel`
3. Configurez les variables d'environnement dans le dashboard Vercel
4. Mettez a jour l'URL du webhook LemonSqueezy avec votre domaine Vercel

## Structure des Pages

- `/` - Page d'accueil avec hero et liste de bouquets
- `/galerie` - Grille d'images
- `/blog` - Articles de blog
- `/pickup` - Formulaire de commande avec paiement

## Personnalisation

### Couleurs

Editez `app/globals.css` pour modifier les couleurs du theme:

```css
@theme {
  --color-primary-600: #cd3562;
  --color-neutral-50: #fafaf9;
  /* etc... */
}
```

### Donnees

- Bouquets: `data/bouquets.ts`
- Articles de blog: `data/articles.ts`
- Images de galerie: `app/(main)/galerie/page.tsx`

## Support

Consultez le README.md pour plus de details.
