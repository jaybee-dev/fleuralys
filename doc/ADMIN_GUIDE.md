# 🔐 Guide Administration - Fleurs com'Florie

## Vue d'Ensemble du Système Admin

Un système d'administration complet a été conçu pour permettre à la fleuriste de gérer son site sans compétences techniques.

## 📋 Fonctionnalités Admin

### 1. Gestion des Bouquets
- ✅ Créer de nouveaux bouquets
- ✅ Modifier les bouquets existants
- ✅ Supprimer des bouquets
- ✅ Activer/désactiver la disponibilité
- ✅ Upload d'images
- ✅ Gérer les prix

### 2. Gestion des Commandes
- ✅ Voir toutes les commandes
- ✅ Filtrer par statut (en attente, payé, prêt, complété)
- ✅ Marquer comme "prêt" ou "complété"
- ✅ Voir les détails clients
- ✅ Export CSV des commandes

### 3. Gestion du Blog
- ✅ Créer des articles
- ✅ Modifier/supprimer articles
- ✅ Ajouter des images
- ✅ Lien vers Instagram

### 4. Gestion de la Galerie
- ✅ Upload d'images
- ✅ Réorganiser les images
- ✅ Supprimer des images
- ✅ Ajouter des descriptions

## 🏗️ Architecture Admin

### Option 1 : Admin Simple (Recommandé pour Démarrer)
**Temps d'implémentation : 2-3h**

```
/admin
  /login          → Page de connexion
  /dashboard      → Vue d'ensemble
  /bouquets       → Gestion bouquets
  /commandes      → Gestion commandes
  /blog           → Gestion articles
  /galerie        → Gestion images
  /parametres     → Paramètres généraux
```

**Avantages :**
- Simple à implémenter
- Pas de base de données complexe
- Fichiers JSON pour les données

**Inconvénients :**
- Limité en scalabilité
- Pas de backup automatique

### Option 2 : Admin Complet avec CMS (Pour Plus Tard)
**Temps d'implémentation : 1-2 semaines**

Utilise un CMS headless comme Sanity ou Strapi.

**Avantages :**
- Interface admin professionnelle
- Backup automatique
- Multi-utilisateurs
- Versioning du contenu

**Inconvénients :**
- Plus complexe
- Coût potentiel
- Temps de développement

## 🚀 Implémentation Recommandée

### Phase 1 : Admin Minimal (MAINTENANT)
**Ce qui est nécessaire tout de suite :**

1. **Authentification Simple**
   - Email/mot de passe stocké dans `.env`
   - Session avec NextAuth
   - Protection des routes admin

2. **Gestion des Commandes**
   - Dashboard Supabase (déjà disponible)
   - Voir les nouvelles commandes
   - Changer le statut

3. **Modification Basique des Bouquets**
   - Changer les prix
   - Activer/désactiver
   - Modifier descriptions

### Phase 2 : Admin Avancé (PLUS TARD)
**Quand le business grandit :**

1. **Upload d'Images**
2. **Éditeur de Contenu Riche**
3. **Statistiques de Vente**
4. **Gestion des Stocks**
5. **Notifications Email/SMS**

## 💻 Solution Actuelle : Supabase Studio

**BONNE NOUVELLE :** Supabase offre déjà une interface admin gratuite!

### Comment y Accéder

1. **Aller sur votre projet Supabase**
   ```
   https://app.supabase.com
   ```

2. **Ouvrir "Table Editor"**
   - Voir toutes les commandes
   - Filtrer, trier, rechercher
   - Modifier directement

3. **Modifier une commande**
   ```sql
   -- Dans SQL Editor
   UPDATE commandes
   SET statut = 'ready'
   WHERE id = 'xxx';
   ```

### Interface Supabase - Fonctionnalités

✅ **Déjà Disponible :**
- Voir toutes les commandes
- Chercher par email, nom
- Filtrer par statut
- Modifier le statut
- Supprimer des commandes
- Export CSV

❌ **Pas Disponible :**
- Interface "jolie" et simple
- Notification automatique
- Workflow guidé

## 🎯 Recommandation : Approche Hybride

### Pour les Commandes : Supabase Studio ✅
**Utiliser directement l'interface Supabase**

**Avantages :**
- Déjà fonctionnel
- Aucun code supplémentaire
- Sécurisé

**Comment faire :**
1. Connectez-vous à Supabase
2. Allez dans "Table Editor" > "commandes"
3. Gérez les commandes directement

### Pour les Bouquets : Interface Admin Custom
**Créer une page admin simple**

**Pourquoi :**
- Modifier prix sans toucher au code
- Activer/désactiver bouquets
- Interface sur mesure

## 🔨 Plan d'Implémentation

### Étape 1 : Admin Login (30 min)
```typescript
// /admin/login
- Formulaire email/password
- Vérification avec env variables
- Session avec NextAuth
```

### Étape 2 : Dashboard (1h)
```typescript
// /admin/dashboard
- Nombre de commandes du jour
- Revenus du mois
- Bouquets les plus vendus
- Liens rapides vers Supabase
```

### Étape 3 : Gestion Bouquets (2h)
```typescript
// /admin/bouquets
- Liste des bouquets
- Modifier prix
- Toggle disponibilité
- Éditer description
```

### Étape 4 : Statistiques (1h)
```typescript
// /admin/stats
- Graphiques de vente
- Top bouquets
- Tendances
```

## 🔐 Sécurité Admin

### Authentification

**Option Simple (Pour Démarrer) :**
```env
# .env.local
ADMIN_EMAIL=florie@fleurs-comflorie.fr
ADMIN_PASSWORD_HASH=hash_bcrypt_du_mot_de_passe
NEXTAUTH_SECRET=votre_secret_aleatoire
```

**Comment générer le hash :**
```bash
# Dans Node.js
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('votre-mot-de-passe', 10);
console.log(hash);
```

### Protection des Routes

```typescript
// Middleware pour protéger /admin/*
import { getServerSession } from 'next-auth'

export async function middleware(request) {
  const session = await getServerSession()
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}
```

## 📊 Dashboard Recommandé

### Vue d'Ensemble
```
┌─────────────────────────────────────────┐
│  Dashboard - Fleurs com'Florie          │
├─────────────────────────────────────────┤
│                                          │
│  📦 Commandes Aujourd'hui: 3            │
│  💰 Revenus du Mois: 450€               │
│  ⏳ Commandes en Attente: 2             │
│  ✅ Commandes Complétées: 24            │
│                                          │
│  ┌──────────────┐  ┌──────────────┐    │
│  │ Voir les     │  │ Gérer les    │    │
│  │ Commandes    │  │ Bouquets     │    │
│  └──────────────┘  └──────────────┘    │
│                                          │
│  Dernières Commandes:                   │
│  ─────────────────────────────────────  │
│  • Marie D. - Bouquet Romance - 45€    │
│  • Pierre L. - Bouquet Zen - 50€       │
│  • Sophie M. - Bouquet Passion - 60€   │
│                                          │
└─────────────────────────────────────────┘
```

## 🎨 Interface Admin - Wireframes

### Page Bouquets
```
┌─────────────────────────────────────────┐
│  [+ Nouveau Bouquet]                    │
├─────────────────────────────────────────┤
│                                          │
│  Bouquet Romance              [Edit]    │
│  Prix: 45€  [Change]  ✓ Disponible     │
│  ────────────────────────────────────   │
│                                          │
│  Bouquet Printemps            [Edit]    │
│  Prix: 35€  [Change]  ✓ Disponible     │
│  ────────────────────────────────────   │
└─────────────────────────────────────────┘
```

## 🚦 Statut Commandes

### Workflow Recommandé
```
1. pending   → Client a commandé
2. paid      → Paiement reçu (automatique)
3. ready     → Bouquet préparé (à marquer manuellement)
4. completed → Client a récupéré (à marquer manuellement)
```

### Notifications Email (À Implémenter)
- `paid` → Email au client : "Paiement confirmé"
- `ready` → Email au client : "Votre bouquet est prêt!"
- `completed` → Email au client : "Merci pour votre visite"

## 📱 Accès Mobile

L'interface admin sera responsive pour permettre la gestion depuis mobile.

**Cas d'usage :**
- Marquer "ready" depuis l'atelier
- Voir nouvelle commande en notification
- Modifier prix rapidement

## 🔄 Prochaines Étapes

### Cette Semaine
- [ ] Lire ce guide
- [ ] Accéder à Supabase Studio
- [ ] Tester la gestion de commande

### Ce Mois-ci
- [ ] Décider : Admin custom ou Supabase suffit?
- [ ] Si custom : Implémenter login admin
- [ ] Créer dashboard basique

### Dans 3 Mois
- [ ] Statistiques de vente
- [ ] Upload d'images
- [ ] Notifications email

## 💡 Recommandation Finale

**Pour démarrer (maintenant) :**
1. Utiliser Supabase Studio pour les commandes
2. Modifier les bouquets directement dans le code
3. Se concentrer sur le business

**Quand le site tourne bien (3-6 mois) :**
1. Implémenter admin custom
2. Upload d'images
3. Automatisation

---

**La simplicité au départ permet de se concentrer sur l'essentiel : vendre des bouquets! 🌸**
