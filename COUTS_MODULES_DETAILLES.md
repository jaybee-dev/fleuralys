# 💰 Coûts Mensuels Détaillés - Tous les Modules

**Date**: 2025-12-15
**Version**: 1.0.0 - Analyse Réaliste avec Plans PRO

---

## 📊 Résumé Exécutif

### Configuration Recommandée PRO (Réaliste)

| Service | Plan | Coût Mensuel | Coût Annuel |
|---------|------|--------------|-------------|
| **Vercel Pro** | Pro | 20 $ (~18 €) | ~216 € |
| **Supabase Pro** | Pro | 25 $ (~23 €) | ~276 € |
| **LemonSqueezy** | Gratuit + 5% commission | Variable* | Variable* |
| **Domaine .fr** | Annuel | ~1 € | ~12 € |
| **TOTAL FIXE** | | **~42 €/mois** | **~504 €/an** |

\* *LemonSqueezy: 5% de commission sur chaque vente (ex: 50 € de vente = 2,50 € de commission)*

---

## 🔍 Détail par Module

### 1. Vercel (Hébergement Web)

#### Plan PRO - 20 $/mois (~18 €)

**Pourquoi PRO plutôt que Gratuit?**
- ✅ Domaine personnalisé professionnel sans limitations
- ✅ Bande passante: 1 TB/mois (vs 100 GB gratuit)
- ✅ Support prioritaire
- ✅ Analytics avancées
- ✅ Protection DDoS renforcée
- ✅ Prévisualisation illimitée des déploiements
- ✅ Jusqu'à 10 membres dans l'équipe (si tu veux donner accès à la fleuriste)

**Inclus dans le Plan Pro**:
- Hébergement illimité
- 1 TB de bande passante/mois (~50 000-100 000 visiteurs)
- Déploiements automatiques illimités
- SSL/HTTPS automatique
- CDN mondial
- Build time: 6000 minutes/mois
- Domaines personnalisés illimités

**Limites**:
- Si > 1 TB de bandwidth: 40 $ par TB supplémentaire

**Estimation pour Fleurs Comflorie**:
- 1 TB = environ 50 000 à 100 000 visiteurs/mois
- Largement suffisant même pour un business florissant
- **Coût**: **18 €/mois** ✅

#### Alternative: Plan Gratuit (0 €)
- Possible pour démarrer
- 100 GB bandwidth = ~10 000 visiteurs/mois
- Acceptable la première année
- **Mais migration vers Pro recommandée dès 2000+ visiteurs/mois**

---

### 2. Supabase (Base de Données + Auth + Storage)

#### Plan PRO - 25 $/mois (~23 €)

**Pourquoi PRO plutôt que Gratuit?**
- ✅ Database: 8 GB (vs 500 MB gratuit)
- ✅ Storage: 100 GB (vs 1 GB gratuit)
- ✅ Bandwidth: 250 GB/mois (vs 5 GB gratuit)
- ✅ Projets jamais mis en pause
- ✅ Backups quotidiens (7 jours de rétention)
- ✅ Support email
- ✅ Authentification avancée
- ✅ Point in Time Recovery (restauration à n'importe quel moment)

**Inclus dans le Plan Pro**:
- Database PostgreSQL: 8 GB
- Storage: 100 GB
- Bandwidth: 250 GB/mois
- Edge Functions: 2 millions d'invocations/mois
- Auth: Utilisateurs illimités
- API rate limit: 5000 req/s

**Estimation pour Fleurs Comflorie**:

**Database (8 GB)**:
- Table `bouquets`: 200 bouquets × 2 KB = 400 KB
- Table `commandes`: 5000 commandes/an × 3 KB = 15 MB
- Total sur 10 ans: ~150 MB
- **Verdict**: Largement suffisant ✅

**Storage (100 GB)**:
- Images bouquets: 200 images × 800 KB = 160 MB
- Images galerie: 100 images × 500 KB = 50 MB
- Total: ~210 MB
- **Verdict**: Suffisant pour 10+ ans ✅

**Bandwidth (250 GB/mois)**:
- 1 visiteur = ~3 MB (images + données)
- 250 GB = ~80 000 visiteurs/mois
- **Verdict**: Largement suffisant ✅

**Coût**: **23 €/mois** ✅

#### Alternative: Plan Gratuit (0 €)
- Possible pour démarrer (6-12 premiers mois)
- 500 MB database + 1 GB storage + 5 GB bandwidth
- **Limite**: ~2500 visiteurs/mois maximum
- Projets inactifs > 7 jours pausés (réactivation gratuite)

---

### 3. LemonSqueezy (Paiement en Ligne)

#### Modèle de Tarification

**Pas de frais fixes** - Commission sur ventes uniquement

**Commission**: **5% + frais bancaires** sur chaque transaction

**Détail des Frais**:
- Commission LemonSqueezy: 5% du montant
- Frais bancaires (Stripe): ~2% + 0,25 €
- **Total**: ~7% + 0,25 € par transaction

**Exemples de Coûts**:

| Prix Bouquet | Commission LS (5%) | Frais Stripe (~2% + 0,25 €) | Total Frais | Net Reçu |
|--------------|-------------------|----------------------------|-------------|----------|
| 30 € | 1,50 € | 0,85 € | 2,35 € | 27,65 € |
| 50 € | 2,50 € | 1,25 € | 3,75 € | 46,25 € |
| 75 € | 3,75 € | 1,75 € | 5,50 € | 69,50 € |
| 100 € | 5,00 € | 2,25 € | 7,25 € | 92,75 € |

**Estimation Mensuelle**:

**Scénario 1** - 20 commandes/mois à 50 € en moyenne:
- Chiffre d'affaires: 1000 €
- Commission LemonSqueezy: 50 €
- Frais Stripe: ~25 €
- **Total frais: ~75 €/mois** (7,5% du CA)
- Net reçu: 925 €

**Scénario 2** - 50 commandes/mois à 60 € en moyenne:
- Chiffre d'affaires: 3000 €
- Commission LemonSqueezy: 150 €
- Frais Stripe: ~75 €
- **Total frais: ~225 €/mois** (7,5% du CA)
- Net reçu: 2775 €

**Scénario 3** - 100 commandes/mois à 50 € en moyenne:
- Chiffre d'affaires: 5000 €
- Commission LemonSqueezy: 250 €
- Frais Stripe: ~125 €
- **Total frais: ~375 €/mois** (7,5% du CA)
- Net reçu: 4625 €

**Avantages de LemonSqueezy**:
- ✅ Aucun frais fixe mensuel
- ✅ Gestion automatique de la TVA (EU + monde)
- ✅ Facturation automatique
- ✅ Webhooks pour synchronisation
- ✅ Support des cartes bancaires, Apple Pay, Google Pay
- ✅ Tableau de bord des ventes
- ✅ Remboursements faciles

**Alternatives**:

| Solution | Coût Fixe | Commission | Total |
|----------|-----------|------------|-------|
| **LemonSqueezy** | 0 € | 5% + ~2% | ~7% + 0,25 € |
| Stripe seul | 0 € | 2,9% + 0,25 € | ~2,9% + 0,25 € |
| PayPal | 0 € | 3,4% + 0,35 € | ~3,4% + 0,35 € |
| Mollie | 0 € | 2,9% + 0,25 € | ~2,9% + 0,25 € |

**⚠️ Note**: Stripe seul est moins cher, mais ne gère pas la TVA automatiquement et nécessite plus de développement. LemonSqueezy est un "merchant of record" qui simplifie tout.

**Recommandation**: Garder LemonSqueezy pour la simplicité, surtout si ventes internationales.

---

### 4. Nom de Domaine

#### Domaine .fr - ~12 €/an (~1 €/mois)

**Options**:
- `fleurscomflorie.fr` - **Recommandé** ✅
- `fleurs-comflorie.fr`
- `comflorie.fr`
- `boutique-comflorie.fr`

**Fournisseurs Recommandés**:
- **OVH**: 6-12 €/an
- **Gandi**: 15-20 €/an (premium, support excellent)
- **Namecheap**: 10-15 €/an
- **Google Domains**: ~12 €/an

**Services Inclus**:
- ✅ DNS management
- ✅ Email forwarding (redirection emails)
- ✅ WHOIS privacy (protection données personnelles)
- ✅ SSL/TLS certificate (via Vercel)

**Coût**: **1 €/mois** (~12 €/an)

---

## 💡 Scénarios de Coûts Complets

### Scénario 1: Lancement (Mois 1-6)

**Configuration**: Plans Gratuits pour tester

| Service | Plan | Coût |
|---------|------|------|
| Vercel | Free | 0 € |
| Supabase | Free | 0 € |
| LemonSqueezy | 0 commandes | 0 € |
| Domaine | Vercel gratuit | 0 € |
| **TOTAL** | | **0 €/mois** |

**Limites**:
- Max ~2000 visiteurs/mois
- Database: 500 MB
- Storage: 1 GB
- Aucune vente en ligne (pas encore de LemonSqueezy setup)

**Recommandation**: Tester le marché sans risque financier

---

### Scénario 2: Croissance Initiale (Mois 6-12)

**Configuration**: Migration vers Pro Supabase

| Service | Plan | Coût Fixe | Coût Variable |
|---------|------|-----------|---------------|
| Vercel | Free | 0 € | - |
| Supabase | Pro | 23 € | - |
| LemonSqueezy | 20 commandes × 50 € | - | ~75 € (commissions) |
| Domaine | .fr | 1 € | - |
| **TOTAL FIXE** | | **24 €/mois** | |
| **TOTAL AVEC VENTES** | | **~99 €/mois** | |

**Chiffre d'affaires**: 1000 €/mois
**Coûts totaux**: 99 €/mois
**Marge nette**: 901 €/mois
**% Coûts**: 9,9% du CA

---

### Scénario 3: Business Établi (Année 2+)

**Configuration**: Plans Pro partout (RECOMMANDÉ)

| Service | Plan | Coût Fixe | Coût Variable |
|---------|------|-----------|---------------|
| Vercel | Pro | 18 € | - |
| Supabase | Pro | 23 € | - |
| LemonSqueezy | 50 commandes × 60 € | - | ~225 € (commissions) |
| Domaine | .fr | 1 € | - |
| **TOTAL FIXE** | | **42 €/mois** | |
| **TOTAL AVEC VENTES** | | **~267 €/mois** | |

**Chiffre d'affaires**: 3000 €/mois
**Coûts totaux**: 267 €/mois
**Marge nette**: 2733 €/mois
**% Coûts**: 8,9% du CA

---

### Scénario 4: Forte Croissance (Année 3+)

**Configuration**: Plans Pro + Volume élevé

| Service | Plan | Coût Fixe | Coût Variable |
|---------|------|-----------|---------------|
| Vercel | Pro | 18 € | - |
| Supabase | Pro | 23 € | - |
| LemonSqueezy | 100 commandes × 50 € | - | ~375 € (commissions) |
| Domaine | .fr | 1 € | - |
| **TOTAL FIXE** | | **42 €/mois** | |
| **TOTAL AVEC VENTES** | | **~417 €/mois** | |

**Chiffre d'affaires**: 5000 €/mois
**Coûts totaux**: 417 €/mois
**Marge nette**: 4583 €/mois
**% Coûts**: 8,3% du CA

---

## 📊 Tableau Comparatif Annuel

### Option A: Plans Gratuits (Maximum)

| Service | Coût Annuel |
|---------|-------------|
| Vercel Free | 0 € |
| Supabase Free | 0 € |
| LemonSqueezy (240 ventes × 50 €) | ~900 € |
| Domaine | 12 € |
| **TOTAL** | **~912 €/an** |

**CA Annuel**: 12 000 €
**% Coûts**: 7,6%

**Limites**:
- Max ~2000 visiteurs/mois
- Projets Supabase pausés après 7 jours d'inactivité
- Peu professionnel

---

### Option B: Plans Pro (RECOMMANDÉ)

| Service | Coût Annuel |
|---------|-------------|
| Vercel Pro | 216 € |
| Supabase Pro | 276 € |
| LemonSqueezy (600 ventes × 60 €) | ~2700 € |
| Domaine | 12 € |
| **TOTAL** | **~3204 €/an** |

**CA Annuel**: 36 000 €
**% Coûts**: 8,9%

**Avantages**:
- ✅ Scalable jusqu'à 100 000+ visiteurs/mois
- ✅ Professionnel
- ✅ Support prioritaire
- ✅ Backups automatiques
- ✅ Aucune limitation

---

## 🎯 Recommandation Finale

### Phase 1: Lancement (Mois 1-3)

**Configuration**: Gratuit total

```
Vercel Free + Supabase Free + Domaine Vercel
= 0 €/mois
```

**Objectif**: Valider le concept, tester le marché

---

### Phase 2: Validation (Mois 3-12)

**Configuration**: Supabase Pro + Domaine

```
Vercel Free + Supabase Pro + Domaine .fr
= 24 €/mois (288 €/an)
```

**Objectif**: Premiers clients, stabiliser les ventes

---

### Phase 3: Croissance (Année 2+)

**Configuration**: Plans Pro (RECOMMANDÉ)

```
Vercel Pro + Supabase Pro + Domaine .fr
= 42 €/mois (504 €/an)
+ LemonSqueezy (~7,5% des ventes)
```

**Objectif**: Scalabilité, professionnalisation, croissance

---

## 💰 Coûts vs Revenus - Analyse Réaliste

### Année 1

**Coûts fixes**: 288 €/an (Supabase Pro + Domaine)
**Coûts variables**: ~900 €/an (LemonSqueezy sur 240 ventes)
**Total coûts**: ~1200 €/an

**Revenus**: 12 000 € (240 ventes × 50 €)
**Marge nette**: 10 800 €
**ROI**: 900% ✅

---

### Année 2

**Coûts fixes**: 504 €/an (Vercel Pro + Supabase Pro + Domaine)
**Coûts variables**: ~2700 €/an (LemonSqueezy sur 600 ventes)
**Total coûts**: ~3200 €/an

**Revenus**: 36 000 € (600 ventes × 60 €)
**Marge nette**: 32 800 €
**ROI**: 1025% ✅

---

### Année 3+

**Coûts fixes**: 504 €/an
**Coûts variables**: ~4500 €/an (LemonSqueezy sur 1000 ventes)
**Total coûts**: ~5000 €/an

**Revenus**: 60 000 € (1000 ventes × 60 €)
**Marge nette**: 55 000 €
**ROI**: 1100% ✅

---

## 🔍 Modules Complémentaires (Optionnels)

### 1. Email Marketing - Brevo (ex-Sendinblue)

**Plan Free**:
- 300 emails/jour gratuits
- Workflows automatisés basiques
- **Coût**: 0 €/mois

**Plan Starter (19 €/mois)**:
- 20 000 emails/mois
- Workflows avancés
- **Recommandé si** > 300 emails/jour

---

### 2. Monitoring - Sentry

**Plan Free**:
- 5000 erreurs/mois
- 1 projet
- **Coût**: 0 €/mois

**Plan Team (29 €/mois)**:
- 50 000 erreurs/mois
- 5 projets
- **Recommandé si** site critique

---

### 3. Analytics - Vercel Analytics

**Inclus dans Vercel Pro**:
- Analytics avancées
- Web Vitals
- **Coût**: Inclus

**Alternative**: Google Analytics (gratuit)

---

## ✅ Checklist de Facturation Mensuelle

### Coûts Fixes Mensuels

- [ ] Vercel Pro: **18 €/mois**
- [ ] Supabase Pro: **23 €/mois**
- [ ] Domaine .fr: **1 €/mois** (12 €/an)
- **TOTAL FIXE: 42 €/mois**

### Coûts Variables (selon ventes)

- [ ] LemonSqueezy: **~7,5% du CA**
  - 20 ventes × 50 € = 75 € de commissions
  - 50 ventes × 60 € = 225 € de commissions
  - 100 ventes × 50 € = 375 € de commissions

### Coûts Optionnels

- [ ] Email Marketing (Brevo): 0-19 €/mois
- [ ] Monitoring (Sentry): 0-29 €/mois

---

## 🎓 Conseils pour Minimiser les Coûts

### 1. Démarrer avec Plans Gratuits

- Vercel Free pendant 6-12 mois
- Supabase Free pendant 3-6 mois
- **Économie**: 504 €/an

### 2. Optimiser les Images

- Compresser avec TinyPNG/ImageOptim
- Utiliser WebP au lieu de JPG/PNG
- **Impact**: Réduit bandwidth → économise 50-100 €/an

### 3. Négocier avec LemonSqueezy

- Volumes > 10 000 €/mois = tarifs négociables
- Possible de passer à 3-4% de commission
- **Impact**: Économise ~500 €/an à 60 000 € de CA

### 4. Utiliser Stripe Direct (si applicable)

- Commission: 2,9% vs 7,5% avec LemonSqueezy
- **MAIS**: Nécessite gestion TVA manuelle
- **Impact**: Économise ~1800 €/an sur 36 000 € de CA
- **Complexité**: Beaucoup plus élevée

---

## 📞 Questions Fréquentes

### "Pourquoi recommander les plans Pro dès le début?"

**Réponse**:
- Plans gratuits = limitations frustrantes
- Migration = complexe et risquée
- Coût Pro (42 €/mois) = négligeable vs potentiel du business
- Professionnalisme = confiance des clients

### "Peut-on réduire la commission LemonSqueezy?"

**Réponse**:
- Oui, avec Stripe direct (2,9% vs 7,5%)
- **MAIS**: Plus complexe (TVA, facturation, compliance)
- LemonSqueezy = "merchant of record" (simplifie tout)
- **Recommandation**: Garder LemonSqueezy jusqu'à 100 000 € de CA/an

### "Que se passe-t-il si on dépasse les limites Pro?"

**Réponse**:
- Vercel: 40 $/TB supplémentaire après 1 TB
- Supabase: Plans Enterprise sur devis
- **MAIS**: À ce stade, le business génère > 100 000 €/an

---

## 💡 Conclusion

### Coûts Réels pour la Fleuriste

**Configuration Recommandée (Plans Pro)**:

| Période | Coûts Fixes | Coûts Variables | Total Mensuel | CA Estimé | % Coûts |
|---------|-------------|-----------------|---------------|-----------|---------|
| **Mois 1-3** | 0 € | 0 € | **0 €** | 0 € | 0% |
| **Mois 3-12** | 24 € | 75 € | **99 €** | 1000 € | 9,9% |
| **Année 2** | 42 € | 225 € | **267 €** | 3000 € | 8,9% |
| **Année 3+** | 42 € | 375 € | **417 €** | 5000 € | 8,3% |

### Points Clés

1. **Coûts fixes modérés**: 42 €/mois (504 €/an) en configuration Pro
2. **Coûts variables prévisibles**: ~7,5% du CA (LemonSqueezy)
3. **ROI excellent**: > 900% dès la première année
4. **Scalabilité garantie**: Supporte jusqu'à 100 000+ visiteurs/mois
5. **Pas de coûts cachés**: Tout est transparent

**Verdict**: Investissement très rentable avec des coûts maîtrisés ! 🎉

---

**Date de création**: 2025-12-15
**Prochaine révision**: 2026-01-15
