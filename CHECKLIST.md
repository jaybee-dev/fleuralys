# Checklist de Configuration et Deploiement

## Phase 1: Configuration Locale

### Installation
- [ ] Cloner/copier le projet
- [ ] Executer `npm install`
- [ ] Verifier que `npm run dev` demarre sans erreur

### Variables d'Environnement
- [ ] Copier `.env.local.example` vers `.env.local`
- [ ] Garder les valeurs temporaires pour le developpement local

## Phase 2: Configuration Supabase

### Compte et Projet
- [ ] Creer un compte sur https://supabase.com
- [ ] Creer un nouveau projet
- [ ] Noter le nom du projet et la region

### Base de Donnees
- [ ] Aller dans "SQL Editor"
- [ ] Copier le contenu de `supabase-schema.sql`
- [ ] Executer le script SQL
- [ ] Verifier que la table `commandes` est creee (onglet "Table Editor")

### Credentials
- [ ] Aller dans "Settings" > "API"
- [ ] Copier "Project URL" dans `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`)
- [ ] Copier "anon/public key" dans `.env.local` (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Phase 3: Configuration LemonSqueezy

### Compte et Boutique
- [ ] Creer un compte sur https://lemonsqueezy.com
- [ ] Creer une nouvelle boutique (Store)
- [ ] Configurer les informations de la boutique

### Produits
- [ ] Creer 6 produits (un par bouquet):
  - [ ] Bouquet Romance (45 EUR)
  - [ ] Bouquet Printemps (35 EUR)
  - [ ] Bouquet Elegance (55 EUR)
  - [ ] Bouquet Champetre (40 EUR)
  - [ ] Bouquet Passion (60 EUR)
  - [ ] Bouquet Zen (50 EUR)
- [ ] Noter l'ID de chaque produit

### Configuration Code
- [ ] Ouvrir `data/bouquets.ts`
- [ ] Remplacer les valeurs `lemonsqueezyProductId` par les vrais IDs

### API Key
- [ ] Aller dans "Settings" > "API"
- [ ] Creer une nouvelle API key
- [ ] Copier la cle dans `.env.local` (`LEMONSQUEEZY_API_KEY`)
- [ ] Copier l'URL de la boutique dans `.env.local` (`NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL`)

### Webhook (a faire apres deploiement)
- [ ] Aller dans "Settings" > "Webhooks"
- [ ] Creer un nouveau webhook
- [ ] URL: `https://votre-domaine.com/api/webhooks/lemonsqueezy`
- [ ] Evenements: `order_created`, `order_refunded`
- [ ] Copier le secret dans `.env.local` (`LEMONSQUEEZY_WEBHOOK_SECRET`)

## Phase 4: Personnalisation

### Images
- [ ] Preparer 6 images de bouquets (800x800px)
- [ ] Preparer 9 images pour la galerie (1200x800px)
- [ ] Preparer 4 images d'articles (1200x630px)
- [ ] Ajouter toutes les images dans `public/images/`
- [ ] Verifier les noms de fichiers (voir `public/images/README.md`)

### Donnees
- [ ] Modifier `data/bouquets.ts` avec vos bouquets reels
- [ ] Modifier `data/articles.ts` avec vos articles
- [ ] Mettre a jour les liens Instagram dans `data/articles.ts`

### Contenu
- [ ] Modifier les informations de contact dans `components/Footer.tsx`
- [ ] Personnaliser le texte du hero dans `app/(main)/page.tsx`
- [ ] Mettre a jour les images de la galerie dans `app/(main)/galerie/page.tsx`

### Theme (optionnel)
- [ ] Modifier les couleurs dans `app/globals.css`
- [ ] Tester le rendu sur mobile, tablette et desktop

## Phase 5: Tests Locaux

### Developpement
- [ ] Executer `npm run dev`
- [ ] Tester chaque page:
  - [ ] Accueil: Bouquets s'affichent correctement
  - [ ] Galerie: Images chargent correctement
  - [ ] Blog: Articles s'affichent
  - [ ] Formulaire: Validation fonctionne

### Build
- [ ] Executer `npm run build`
- [ ] Verifier qu'il n'y a pas d'erreurs
- [ ] Executer `npm start`
- [ ] Tester le site en mode production

## Phase 6: Deploiement

### Preparation
- [ ] Commiter tous les changements dans Git
- [ ] Pousser sur GitHub/GitLab (recommande)
- [ ] Verifier que `.env.local` n'est PAS commite

### Vercel (Recommande)
- [ ] Creer un compte sur https://vercel.com
- [ ] Importer le projet depuis Git
- [ ] Configurer TOUTES les variables d'environnement:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `LEMONSQUEEZY_API_KEY`
  - [ ] `LEMONSQUEEZY_STORE_ID`
  - [ ] `LEMONSQUEEZY_WEBHOOK_SECRET`
  - [ ] `NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL`
- [ ] Deployer
- [ ] Noter l'URL de production

### Configuration Post-Deploiement
- [ ] Mettre a jour l'URL du webhook LemonSqueezy avec l'URL de production
- [ ] Tester le webhook dans le dashboard LemonSqueezy

## Phase 7: Tests de Production

### Fonctionnalites
- [ ] Toutes les pages se chargent correctement
- [ ] Les images s'affichent
- [ ] Le formulaire de commande fonctionne
- [ ] La validation du formulaire fonctionne

### Paiement
- [ ] Tester une commande complete (mode test de LemonSqueezy)
- [ ] Verifier que la redirection vers LemonSqueezy fonctionne
- [ ] Verifier que le paiement s'enregistre dans Supabase
- [ ] Verifier que le statut passe a "paid" apres paiement

### Mobile
- [ ] Tester sur mobile (responsive)
- [ ] Tester sur tablette
- [ ] Verifier la navigation

## Phase 8: Lancement

### Communication
- [ ] Partager l'URL du site
- [ ] Mettre le lien sur les reseaux sociaux
- [ ] Mettre a jour Google My Business

### Surveillance
- [ ] Configurer les alertes Vercel (erreurs)
- [ ] Verifier regulierement les commandes dans Supabase
- [ ] Monitorer les webhooks dans LemonSqueezy

## Aide et Support

Si vous rencontrez des problemes:
- Consultez `README.md` pour la documentation complete
- Consultez `QUICKSTART.md` pour le guide de demarrage
- Consultez `DEPLOYMENT.md` pour le deploiement
- Verifiez les logs dans Vercel
- Verifiez les webhooks dans LemonSqueezy

## Notes Importantes

- Les variables `NEXT_PUBLIC_*` sont visibles cote client
- Le webhook secret est sensible, ne le partagez pas
- Testez toujours en mode test avant d'accepter de vrais paiements
- Sauvegardez regulierement votre base de donnees Supabase

Bonne chance avec votre site! 🌸
