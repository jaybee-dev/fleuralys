# Site Web Fleuriste

Site web moderne pour une fleuriste avec système de commande en ligne et paiement via SumUp.

## Fonctionnalités

- Page d'accueil avec bannière hero et grille de bouquets
- Galerie de compositions florales
- Blog avec liens vers Instagram
- Formulaire de commande "Pickup" avec validation
- Paiement en ligne via SumUp
- Stockage des commandes dans Supabase

## Stack Technique

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de données**: Supabase
- **Paiements**: SumUp
- **Validation**: React Hook Form + Zod
- **Hébergement**: Vercel

## Installation

1. Cloner le repository
```bash
git clone <votre-repo>
cd fleuriste-site
```

2. Installer les dépendances
```bash
npm install
```

3. Créer le fichier `.env.local`
```bash
cp .env.local.example .env.local
```

4. Configurer les variables d'environnement dans `.env.local`

## Configuration

### 1. Supabase

1. Créer un projet sur [Supabase](https://supabase.com)
2. Dans le SQL Editor, exécuter le script `supabase-schema.sql`
3. Copier l'URL du projet et la clé anon dans `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. LemonSqueezy

1. Créer un compte sur [LemonSqueezy](https://lemonsqueezy.com)
2. Créer une boutique (Store)
3. Créer un produit pour chaque bouquet dans le dashboard
4. Noter les IDs de produits et les mettre à jour dans `data/bouquets.ts`
5. Générer une clé API dans Settings > API
6. Configurer les variables d'environnement:
```env
LEMONSQUEEZY_API_KEY=your-api-key
LEMONSQUEEZY_STORE_ID=your-store-id
LEMONSQUEEZY_WEBHOOK_SECRET=your-webhook-secret
NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL=https://your-store.lemonsqueezy.com
```

### 3. Webhook LemonSqueezy

1. Dans le dashboard LemonSqueezy, aller dans Settings > Webhooks
2. Créer un nouveau webhook avec l'URL: `https://votre-domaine.com/api/webhooks/lemonsqueezy`
3. Sélectionner les événements: `order_created` et `order_refunded`
4. Copier le secret du webhook dans `.env.local`

### 4. Images

Ajouter vos images dans le dossier `public/images/`:
- Images des bouquets (nommées selon `data/bouquets.ts`)
- Images de la galerie (`galerie-1.jpg` à `galerie-9.jpg`)
- Images des articles de blog

## Développement

Lancer le serveur de développement:
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Build & Déploiement

### Build local
```bash
npm run build
npm start
```

### Déploiement sur Vercel

1. Installer Vercel CLI
```bash
npm i -g vercel
```

2. Déployer
```bash
vercel
```

3. Configurer les variables d'environnement dans le dashboard Vercel

Ou connecter votre repository GitHub à Vercel pour un déploiement automatique.

## Structure du Projet

```
/app
  /(main)
    /page.tsx          # Page d'accueil
    /galerie/page.tsx  # Galerie
    /blog/page.tsx     # Blog
    /pickup/page.tsx   # Formulaire de commande
    /layout.tsx        # Layout avec Navbar et Footer
  /api
    /orders/route.ts   # API pour créer des commandes
    /webhooks/lemonsqueezy/route.ts  # Webhook LemonSqueezy
  /layout.tsx          # Layout racine
  /globals.css         # Styles globaux
/components
  /BouquetCard.tsx     # Carte bouquet
  /Navbar.tsx          # Navigation
  /Footer.tsx          # Pied de page
/data
  /bouquets.ts         # Données des bouquets
  /articles.ts         # Données des articles
/lib
  /supabase.ts         # Configuration Supabase
  /lemonsqueezy.ts     # Configuration LemonSqueezy
/public
  /images/             # Images du site
```

## Personnalisation

### Modifier les couleurs

Éditer `tailwind.config.ts` pour changer les couleurs du thème:
```typescript
colors: {
  primary: {
    // Vos couleurs
  }
}
```

### Ajouter des bouquets

Modifier `data/bouquets.ts` et ajouter vos bouquets avec leurs IDs LemonSqueezy

### Modifier les articles de blog

Modifier `data/articles.ts` avec vos articles et liens Instagram

## Support

Pour toute question, consulter la documentation:
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [LemonSqueezy](https://docs.lemonsqueezy.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Licence

MIT
