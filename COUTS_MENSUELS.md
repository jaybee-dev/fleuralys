# 💰 Coûts Mensuels - Site Fleurs Comflorie

**Date**: 2025-12-15
**Version**: 1.0.0

---

## 📊 Résumé Rapide

| Service | Coût Mensuel | Coût Annuel |
|---------|--------------|-------------|
| **Vercel (Hébergement)** | 0 € | 0 € |
| **Supabase (BDD + Auth + Storage)** | 0 € | 0 € |
| **Domaine (optionnel)** | ~1 € | ~12 € |
| **TOTAL** | **0-1 €/mois** | **0-12 €/an** |

**🎉 Le site est quasiment GRATUIT pour toujours !**

---

## 🔍 Détail des Coûts

### 1. Vercel (Hébergement du Site Web)

**Plan**: Hobby (Gratuit)

#### Inclus dans le Plan Gratuit
- ✅ Hébergement illimité
- ✅ 100 GB de bande passante/mois
- ✅ Déploiements automatiques depuis Git
- ✅ SSL/HTTPS automatique
- ✅ CDN mondial
- ✅ Prévisualisations de branches
- ✅ Domaine Vercel (.vercel.app)

#### Limites du Plan Gratuit
- 100 GB de bande passante/mois
- Jusqu'à 100 déploiements/jour
- Équipe de 1 personne

#### Estimation pour Fleurs Comflorie
**Coût**: **0 €/mois** ✅

**Justification**:
- Site de fleuriste = trafic modéré (quelques centaines/milliers de visiteurs/mois)
- 100 GB de bande passante = environ **10 000 à 50 000 visiteurs/mois** (selon poids des images)
- Largement suffisant pour une fleuriste locale

#### Passage au Plan Pro (si besoin futur)
- **Coût**: 20 $/mois (~18 €)
- Nécessaire si:
  - Plus de 100 GB de bande passante/mois
  - Besoin de plusieurs membres dans l'équipe
  - Domaine personnalisé avancé
  - **MAIS TRÈS IMPROBABLE** pour ce projet

---

### 2. Supabase (Base de Données + Auth + Storage)

**Plan**: Free (Gratuit)

#### Inclus dans le Plan Gratuit
- ✅ Base de données PostgreSQL (500 MB)
- ✅ Authentification (50 000 utilisateurs actifs/mois)
- ✅ Storage (1 GB)
- ✅ Edge Functions (500 000 invocations/mois)
- ✅ Bandwidth: 5 GB/mois
- ✅ API illimitée

#### Limites du Plan Gratuit
- Database: 500 MB
- Storage: 1 GB
- Bandwidth: 5 GB/mois
- Projets inactifs > 7 jours sont mis en pause (réactivation gratuite)

#### Estimation pour Fleurs Comflorie

**Coût**: **0 €/mois** ✅

**Justification**:

**Base de données (500 MB)**:
- Table `bouquets`: ~50 bouquets × 1 KB = 50 KB
- Table `commandes`: 1000 commandes/an × 2 KB = 2 MB
- Total sur 10 ans: ~20 MB
- **Verdict**: Largement suffisant ✅

**Storage (1 GB)**:
- Images bouquets: 50 images × 500 KB = 25 MB
- Images galerie: 20 images × 300 KB = 6 MB
- Total: ~31 MB
- **Verdict**: Largement suffisant ✅

**Bandwidth (5 GB/mois)**:
- 1 visiteur = ~2 MB (images + données)
- 5 GB = ~2500 visiteurs/mois
- **Verdict**: Suffisant pour démarrer ✅

**⚠️ Note**: Si le site reçoit plus de 2500 visiteurs/mois, il faudra passer au plan Pro

#### Passage au Plan Pro (si besoin futur)
- **Coût**: 25 $/mois (~23 €)
- Nécessaire si:
  - Plus de 500 MB de données (très improbable)
  - Plus de 1 GB d'images (probable après plusieurs années)
  - Plus de 5 GB de bandwidth/mois (environ 2500 visiteurs)
  - **PROBABLE DANS 2-3 ANS** si le business se développe bien

---

### 3. Nom de Domaine (Optionnel)

**Domaine actuel**: `fleurs-comflorie.vercel.app` (gratuit)

#### Option 1: Garder le Domaine Vercel (Gratuit)
- **Coût**: 0 €/mois
- Domaine: `fleurs-comflorie.vercel.app`
- ✅ Professionnel
- ✅ SSL inclus
- ✅ Fonctionne parfaitement
- ⚠️ Pas de domaine personnalisé type `.fr` ou `.com`

#### Option 2: Acheter un Domaine Personnalisé
- **Coût**: ~1 €/mois (~12 €/an)
- Exemples:
  - `fleurscomflorie.fr` (~12 €/an chez OVH, Gandi, Namecheap)
  - `fleurs-comflorie.com` (~12 €/an)
  - `comflorie.fr` (~12 €/an)

**Recommandation**: Commencer avec le domaine Vercel gratuit, acheter un domaine personnalisé plus tard si besoin.

---

## 📈 Scénarios de Coûts

### Scénario 1: Démarrage (Année 1-2)
**Situation**:
- 100-500 visiteurs/mois
- 10-20 bouquets en catalogue
- 50-100 commandes/an

**Coûts**:
- Vercel: **0 €**
- Supabase: **0 €**
- Domaine: **0 € (ou 12 €/an si achat)**

**TOTAL**: **0 €/mois** (ou 1 €/mois avec domaine)

---

### Scénario 2: Croissance Modérée (Année 2-3)
**Situation**:
- 1000-2000 visiteurs/mois
- 30-50 bouquets en catalogue
- 200-300 commandes/an

**Coûts**:
- Vercel: **0 €** (dans les limites)
- Supabase: **0 €** (dans les limites)
- Domaine: **1 €/mois** (recommandé à ce stade)

**TOTAL**: **1 €/mois**

---

### Scénario 3: Forte Croissance (Année 3+)
**Situation**:
- 3000-5000 visiteurs/mois
- 50-100 bouquets en catalogue
- 500-1000 commandes/an
- Storage: 500 MB d'images

**Coûts**:
- Vercel: **0 €** (toujours dans les limites)
- Supabase: **23 €/mois** (passage au plan Pro pour bandwidth)
- Domaine: **1 €/mois**

**TOTAL**: **24 €/mois** (~288 €/an)

**⚠️ Mais à ce stade**, le business génère probablement 30 000-50 000 €/an de CA, donc 288 €/an est négligeable (< 1% du CA)

---

### Scénario 4: Très Forte Croissance (Année 5+)
**Situation**:
- 10 000+ visiteurs/mois
- 100+ bouquets en catalogue
- 2000+ commandes/an
- Storage: 2 GB d'images

**Coûts**:
- Vercel: **18 €/mois** (passage au plan Pro pour bandwidth)
- Supabase: **23 €/mois** (plan Pro)
- Domaine: **1 €/mois**

**TOTAL**: **42 €/mois** (~504 €/an)

**À ce stade**, le business génère probablement 100 000+ €/an de CA, donc 504 €/an reste négligeable (< 0.5% du CA)

---

## 🎯 Recommandation Initiale

### Pour Démarrer (Maintenant)

**Coût**: **0 €/mois**

**Configuration**:
- ✅ Hébergement: Vercel Free
- ✅ Base de données: Supabase Free
- ✅ Domaine: `fleurs-comflorie.vercel.app` (gratuit)
- ✅ SSL/HTTPS: Inclus
- ✅ Backups automatiques: Inclus dans Supabase

**Pourquoi?**
- Tester le marché sans risque financier
- Valider le concept
- Aucun engagement financier
- Possibilité d'upgrade à tout moment

---

### Après 6-12 Mois (Si le Site Fonctionne Bien)

**Coût**: **1 €/mois** (~12 €/an)

**Évolution**:
- Acheter un domaine personnalisé (`fleurscomflorie.fr`)
- Plus professionnel
- Meilleur pour le SEO
- Conserve tout le reste gratuit

---

### Quand Passer aux Plans Payants?

**Supabase Pro (23 €/mois)** - Quand:
- Plus de 2500 visiteurs/mois
- Plus de 5 GB de bandwidth/mois
- Storage > 1 GB (après plusieurs années)

**Vercel Pro (18 €/mois)** - Quand:
- Plus de 100 GB de bandwidth/mois
- Besoin de features avancées (très rare)

**⚠️ Important**: Ces limites sont surveillées par les plateformes, tu recevras des alertes **avant** d'être facturé.

---

## 💡 Comparaison avec Autres Solutions

### Alternative 1: WordPress + OVH
**Coûts**:
- Hébergement OVH: 5 €/mois
- Domaine: 1 €/mois
- Thème premium: 50 € (one-time)
- Plugins premium: 10 €/mois

**TOTAL**: **16 €/mois** (~192 €/an)

**Inconvénients**:
- Plus lent
- Moins sécurisé
- Maintenance complexe
- Mises à jour manuelles

---

### Alternative 2: Wix / Squarespace
**Coûts**:
- Plan Business: 20-25 €/mois
- Domaine: Inclus

**TOTAL**: **20-25 €/mois** (~240-300 €/an)

**Inconvénients**:
- Moins flexible
- Pas de code personnalisé
- Performances limitées
- Lock-in plateforme

---

### Alternative 3: Shopify
**Coûts**:
- Plan Basic: 25 €/mois
- Commissions: 2% par transaction

**TOTAL**: **25+ €/mois** (~300+ €/an)

**Inconvénients**:
- Coûts fixes élevés
- Commissions sur ventes
- Overkill pour ce besoin

---

## 🏆 Verdict: Next.js + Vercel + Supabase

**Avantages**:
- ✅ **0 €/mois** pour démarrer
- ✅ Performances excellentes
- ✅ Sécurité de niveau entreprise
- ✅ Scalabilité automatique
- ✅ Contrôle total du code
- ✅ Pas de lock-in
- ✅ Mises à jour gratuites
- ✅ Pas de coûts cachés

**Inconvénients**:
- ⚠️ Nécessite un développeur pour modifications (toi !)

---

## 📋 Checklist de Facturation

### Coûts Actuels (Aujourd'hui)
- [ ] Vercel: 0 €/mois ✅
- [ ] Supabase: 0 €/mois ✅
- [ ] Domaine: 0 €/mois ✅
- [ ] **TOTAL: 0 €/mois**

### Coûts à Prévoir (6-12 mois)
- [ ] Domaine personnalisé: ~1 €/mois (optionnel)

### Coûts Futurs (2-3 ans, si forte croissance)
- [ ] Supabase Pro: 23 €/mois (si > 2500 visiteurs/mois)
- [ ] Vercel Pro: 18 €/mois (très improbable)

---

## 🎓 Conseils pour Minimiser les Coûts

### 1. Optimiser les Images
- Utiliser WebP au lieu de PNG/JPG (réduction 30-50%)
- Compresser les images avant upload
- Utiliser Next.js Image Optimization (gratuit sur Vercel)
- **Impact**: Réduit le bandwidth → reste dans le plan gratuit plus longtemps

### 2. Monitorer l'Utilisation
- Dashboard Vercel: Surveiller bandwidth
- Dashboard Supabase: Surveiller storage et bandwidth
- Configurer des alertes à 80% des limites
- **Impact**: Anticipe les dépassements

### 3. Nettoyer Régulièrement
- Supprimer les images non utilisées
- Archiver les vieilles commandes
- Optimiser les requêtes SQL
- **Impact**: Réduit le storage et améliore les performances

### 4. Éviter les Surcapacités
- Ne pas passer au plan Pro "au cas où"
- Upgrader uniquement quand nécessaire
- Les plateformes préviennent avant facturation
- **Impact**: Économise 20-40 €/mois inutiles

---

## 📞 Questions Fréquentes

### "Que se passe-t-il si je dépasse les limites gratuites?"

**Vercel**:
- Tu reçois un email d'alerte à 80% de la limite
- Le site continue de fonctionner
- Proposition d'upgrade au plan Pro
- Aucune coupure brutale

**Supabase**:
- Tu reçois un email d'alerte à 80% de la limite
- Le projet peut être throttled (ralenti)
- Proposition d'upgrade au plan Pro
- Les projets inactifs > 7 jours sont pausés (réactivation gratuite)

### "Puis-je migrer vers une autre solution plus tard?"

**Oui, facilement !**
- Code source = 100% portable (Next.js standard)
- Base de données = PostgreSQL standard (export SQL)
- Images = téléchargeables depuis Supabase Storage
- Pas de lock-in technologique

### "Y a-t-il des frais cachés?"

**Non**:
- Vercel et Supabase sont transparents
- Pas de frais de setup
- Pas de frais de sortie
- Pas de minimum d'engagement
- Tous les coûts sont affichés dans les dashboards

### "Combien coûte la maintenance?"

**0 € en frais récurrents**:
- Mises à jour Next.js: Gratuites
- Mises à jour Supabase: Automatiques et gratuites
- SSL/HTTPS: Automatique et gratuit
- Backups: Inclus dans Supabase

**Mais nécessite**:
- Temps de développement pour nouvelles features
- Surveillance occasionnelle des tableaux de bord

---

## 📊 Tableau Récapitulatif Final

| Période | Visiteurs/mois | Coût Mensuel | Coût Annuel | % du CA (estimé) |
|---------|----------------|--------------|-------------|-------------------|
| **Année 1** | 100-500 | 0 € | 0 € | 0% |
| **Année 2** | 500-2000 | 0-1 € | 0-12 € | < 0.1% |
| **Année 3** | 2000-5000 | 1-24 € | 12-288 € | < 1% |
| **Année 5+** | 10000+ | 24-42 € | 288-504 € | < 0.5% |

---

## ✅ Conclusion

**Pour la fleuriste**, le coût mensuel du site est:

- **0 €/mois** pendant la première année (voire plus)
- **1 €/mois** si elle achète un domaine personnalisé
- **23-42 €/mois** uniquement si le site devient très populaire (> 2500 visiteurs/mois)

**À ce moment-là**, le business génère suffisamment de revenus pour que ces coûts soient négligeables.

**C'est un investissement EXTRÊMEMENT rentable** comparé aux alternatives (WordPress, Wix, Shopify) qui coûtent 15-30 €/mois dès le départ.

---

**Date de création**: 2025-12-15
**Prochaine révision**: 2026-01-15 (vérifier les tarifs actuels)
