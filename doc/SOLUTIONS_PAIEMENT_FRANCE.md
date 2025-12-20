# 💳 Solutions de Paiement en France - Comparatif Complet

**Date**: 2025-12-15
**Contexte**: Site fleuriste, ventes principalement en France

---

## 🎯 Résumé Rapide

| Solution | Commission | Frais Fixes | Setup | Difficulté | Recommandé |
|----------|-----------|-------------|-------|------------|------------|
| **Stripe** | 1,5% + 0,25 € | 0 € | Simple | ⭐⭐ | ✅✅ Oui |
| **Mollie** | 2,9% + 0,25 € | 0 € | Très simple | ⭐ | ✅ Oui |
| **Sumup** | 1,39% | 0 € | Simple | ⭐⭐ | ✅✅ Excellent |
| **PayPlug** | 1,5% + 0,25 € | 0 € | Très simple | ⭐ | ✅✅ Français |
| **LemonSqueezy** | 5% + 2% | 0 € | Très simple | ⭐ | ❌ Seulement international |
| **Lydia Pro** | 1% | 0 € | Simple | ⭐ | ✅ Excellent FR |
| **PayPal** | 3,4% + 0,35 € | 0 € | Simple | ⭐⭐ | ⚠️ Cher |

---

## 📊 Détail par Solution

### 1. Stripe (🌍 International - Leader Mondial)

#### Tarification France
- **Commission**: 1,5% + 0,25 € par transaction (cartes EU)
- **Commission internationale**: 2,9% + 0,25 €
- **Aucun frais fixe mensuel**

#### Avantages
- ✅ API excellente (la plus utilisée)
- ✅ Documentation parfaite
- ✅ Accepte CB, Visa, Mastercard, Amex, Apple Pay, Google Pay
- ✅ Dashboard clair
- ✅ Webhooks fiables
- ✅ Virements automatiques J+2 à J+7

#### Inconvénients
- ❌ Gestion TVA manuelle (nécessaire pour ventes hors France)
- ❌ Facturation non automatique
- ❌ Setup plus technique (mais documentation excellente)

#### Coût pour 12 000 € de CA
```
Commission: 12 000 × 1,5% = 180 €
Frais fixes: 240 commandes × 0,25 € = 60 €
TOTAL: 240 €/an (2,0% du CA)
```

**Intégration**: Code déjà préparé (similaire à LemonSqueezy)

---

### 2. Sumup (🇫🇷 Français - TPE/PME)

#### Tarification France
- **Commission**: 1,39% par transaction
- **Aucun frais fixe**
- **Aucun engagement**

#### Avantages
- ✅ Commission la plus basse du marché
- ✅ Interface française simple
- ✅ Support en français
- ✅ Virements sous 2-3 jours
- ✅ CB, Visa, Mastercard, Apple Pay, Google Pay
- ✅ API REST disponible

#### Inconvénients
- ❌ Moins connu que Stripe
- ❌ Documentation API moins complète
- ❌ Pas de TVA automatique

#### Coût pour 12 000 € de CA
```
Commission: 12 000 × 1,39% = 166,80 €
TOTAL: 166,80 €/an (1,39% du CA)
```

**⭐ MEILLEURE OPTION ÉCONOMIQUE** pour ventes France uniquement

---

### 3. Mollie (🇳🇱 Néerlandais - Europe)

#### Tarification France
- **Commission**: 2,9% + 0,25 € par transaction
- **Aucun frais fixe mensuel**

#### Avantages
- ✅ Très simple à intégrer
- ✅ Interface claire (français disponible)
- ✅ Support réactif
- ✅ CB, Visa, Mastercard, PayPal, Apple Pay, Bancontact, etc.
- ✅ Dashboard excellent
- ✅ API bien documentée

#### Inconvénients
- ❌ Commission plus élevée que Stripe
- ❌ Gestion TVA manuelle

#### Coût pour 12 000 € de CA
```
Commission: 12 000 × 2,9% = 348 €
Frais fixes: 240 commandes × 0,25 € = 60 €
TOTAL: 408 €/an (3,4% du CA)
```

**Bon compromis** simplicité/coût

---

### 4. PayPlug (🇫🇷 Français - Start-ups)

#### Tarification France
- **Commission Standard**: 1,5% + 0,25 € (cartes FR)
- **Commission Premium**: 2% + 0,25 € (toutes cartes)
- **Aucun frais fixe mensuel**

#### Avantages
- ✅ **100% français** (Paris)
- ✅ Support en français excellent
- ✅ Interface très simple
- ✅ Conçu pour PME françaises
- ✅ CB, Visa, Mastercard, Apple Pay
- ✅ Facturation intégrée
- ✅ API REST simple

#### Inconvénients
- ❌ Moins de fonctionnalités que Stripe
- ❌ Gestion TVA manuelle

#### Coût pour 12 000 € de CA
```
Commission: 12 000 × 1,5% = 180 €
Frais fixes: 240 commandes × 0,25 € = 60 €
TOTAL: 240 €/an (2,0% du CA)
```

**⭐ EXCELLENT CHOIX** pour entreprise française

---

### 5. Lydia Pro (🇫🇷 Français - Mobile-first)

#### Tarification France
- **Commission**: 1% par transaction
- **Aucun frais fixe**
- **Aucun engagement**

#### Avantages
- ✅ **Commission la plus basse** (1%)
- ✅ 100% français (Paris)
- ✅ Interface très simple
- ✅ Mobile-first (excellente UX)
- ✅ Support français
- ✅ Virements instantanés possibles

#### Inconvénients
- ❌ Moins connu que Stripe/PayPal
- ❌ API moins documentée
- ❌ Principalement pour paiements entre particuliers

#### Coût pour 12 000 € de CA
```
Commission: 12 000 × 1% = 120 €
TOTAL: 120 €/an (1,0% du CA)
```

**⭐⭐ MEILLEURE OPTION** si l'intégration API est simple

---

### 6. LemonSqueezy (🇺🇸 US - International)

#### Tarification
- **Commission**: 5% + frais Stripe (2% + 0,25 €)
- **Total**: 7% + 0,25 € par transaction

#### Avantages
- ✅ Gestion TVA automatique (EU + monde)
- ✅ "Merchant of Record" (simplifie tout)
- ✅ Facturation automatique
- ✅ Dashboard complet
- ✅ Webhooks excellents

#### Inconvénients
- ❌ **Commission très élevée** (7%)
- ❌ **Inutile pour ventes France uniquement**
- ❌ Virements plus lents (US → EU)

#### Coût pour 12 000 € de CA
```
Commission LS: 12 000 × 5% = 600 €
Commission Stripe: 12 000 × 2% = 240 €
Frais fixes: 240 × 0,25 € = 60 €
TOTAL: 900 €/an (7,5% du CA)
```

**❌ PAS RECOMMANDÉ** pour ventes France uniquement

**✅ RECOMMANDÉ** uniquement si ventes internationales (EU + US + reste du monde)

---

### 7. PayPal (🌍 International)

#### Tarification France
- **Commission**: 3,4% + 0,35 € par transaction
- **Aucun frais fixe**

#### Avantages
- ✅ Très connu (confiance client)
- ✅ Simple à intégrer
- ✅ Accepté partout

#### Inconvénients
- ❌ Commission élevée (3,4%)
- ❌ Frais fixes élevés (0,35 €)
- ❌ Service client médiocre
- ❌ Blocages de compte fréquents

#### Coût pour 12 000 € de CA
```
Commission: 12 000 × 3,4% = 408 €
Frais fixes: 240 × 0,35 € = 84 €
TOTAL: 492 €/an (4,1% du CA)
```

**⚠️ Acceptable** mais plus cher que Stripe/Sumup

---

## 🏆 Comparaison Finale - Coûts Réels

### Pour 12 000 € de CA/an (240 commandes × 50 €)

| Solution | Coût Total | % du CA | Difficulté | Support FR |
|----------|-----------|---------|------------|------------|
| **Lydia Pro** | **120 €** ✅✅✅ | **1,0%** | ⭐ | ✅ |
| **Sumup** | **167 €** ✅✅ | **1,4%** | ⭐⭐ | ✅ |
| **Stripe** | **240 €** ✅ | **2,0%** | ⭐⭐ | ❌ (EN) |
| **PayPlug** | **240 €** ✅ | **2,0%** | ⭐ | ✅ |
| **Mollie** | **408 €** | **3,4%** | ⭐ | ✅ |
| **PayPal** | **492 €** | **4,1%** | ⭐⭐ | ⚠️ |
| **LemonSqueezy** | **900 €** ❌ | **7,5%** | ⭐ | ❌ (EN) |

---

### Pour 36 000 € de CA/an (600 commandes × 60 €)

| Solution | Coût Total | % du CA | Économie vs LS |
|----------|-----------|---------|----------------|
| **Lydia Pro** | **360 €** ✅✅✅ | **1,0%** | 2 340 € |
| **Sumup** | **500 €** ✅✅ | **1,4%** | 2 200 € |
| **Stripe** | **690 €** ✅ | **1,9%** | 2 010 € |
| **PayPlug** | **690 €** ✅ | **1,9%** | 2 010 € |
| **Mollie** | **1 194 €** | **3,3%** | 1 506 € |
| **PayPal** | **1 434 €** | **4,0%** | 1 266 € |
| **LemonSqueezy** | **2 700 €** ❌ | **7,5%** | - |

**LemonSqueezy coûte 2 340 € de plus que Lydia Pro sur 36 000 € de CA !**

---

## 🎯 Recommandations par Cas

### Cas 1: Ventes 100% France (ou EU) - Simplicité Maximale

**Solution recommandée**: **Lydia Pro** ou **Sumup**

**Pourquoi?**
- ✅ Commission ultra basse (1-1,4%)
- ✅ Interface française simple
- ✅ Support français
- ✅ Pas de TVA complexe (France = simple)

**Coût**: 120-167 €/an sur 12 000 € de CA

---

### Cas 2: Ventes France - Besoin API Robuste

**Solution recommandée**: **Stripe** ou **PayPlug**

**Pourquoi?**
- ✅ API excellente et documentée
- ✅ Commission raisonnable (1,5-2%)
- ✅ Stripe = standard de l'industrie
- ✅ PayPlug = français avec bon support

**Coût**: 240 €/an sur 12 000 € de CA

---

### Cas 3: Ventes Internationales (EU + US + Reste)

**Solution recommandée**: **LemonSqueezy** ou **Stripe**

**Pourquoi?**
- ✅ LemonSqueezy gère la TVA automatiquement (énorme gain de temps)
- ✅ "Merchant of Record" = simplifie légalement tout
- ✅ Stripe = accepté partout, mais TVA manuelle

**Coût LemonSqueezy**: 900 €/an sur 12 000 € de CA
**Coût Stripe**: 240-350 €/an (selon volume international)

**Note**: Le surcoût LemonSqueezy vaut le coup si > 20% de ventes hors France

---

### Cas 4: Ventes France + Un Peu d'International

**Solution recommandée**: **Stripe** avec gestion TVA simplifiée

**Pourquoi?**
- ✅ Commission basse (1,5-2,9%)
- ✅ TVA EU gérable avec un comptable
- ✅ Meilleur compromis coût/simplicité

**Coût**: 240-400 €/an selon volume international

---

## 🔧 Intégration Technique

### Stripe (Exemple)

```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function createCheckoutSession(
  amount: number,
  bouquetId: string,
  commandeId: string
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal', 'klarna'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Bouquet',
        },
        unit_amount: amount * 100, // en centimes
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    metadata: {
      bouquet_id: bouquetId,
      commande_id: commandeId,
    },
  })

  return session.url
}
```

**Temps d'intégration**: 2-3 heures (remplacer LemonSqueezy par Stripe)

---

### Sumup (Exemple)

```typescript
// lib/sumup.ts
export async function createSumupCheckout(
  amount: number,
  description: string,
  commandeId: string
) {
  const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SUMUP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      checkout_reference: commandeId,
      amount: amount,
      currency: 'EUR',
      description: description,
      return_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    }),
  })

  const data = await response.json()
  return data.id
}
```

**Temps d'intégration**: 1-2 heures

---

### PayPlug (Exemple)

```typescript
// lib/payplug.ts
import Payplug from 'payplug'

const payplug = new Payplug({
  secretKey: process.env.PAYPLUG_SECRET_KEY!,
})

export async function createPayPlugPayment(
  amount: number,
  email: string,
  commandeId: string
) {
  const payment = await payplug.payments.create({
    amount: amount * 100, // en centimes
    currency: 'EUR',
    customer: { email },
    notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/payplug`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    metadata: {
      commande_id: commandeId,
    },
  })

  return payment.hosted_payment.payment_url
}
```

**Temps d'intégration**: 1-2 heures

---

## 💰 Coûts Totaux du Site - Version Révisée

### Avec Lydia Pro ou Sumup (Recommandé France)

**Année 1 (12 000 € CA)**:
```
Vercel Free:           0 €
Supabase Free:         0 €
Sumup:               167 €
Domaine:              12 €
──────────────────────────
TOTAL:               179 €/an (1,5% du CA)
```

**Année 2 (36 000 € CA)**:
```
Vercel Pro:          216 €
Supabase Pro:        276 €
Sumup:               500 €
Domaine:              12 €
──────────────────────────
TOTAL:             1 004 €/an (2,8% du CA)
```

---

### Avec Stripe (Compromis Qualité/Prix)

**Année 1 (12 000 € CA)**:
```
Vercel Free:           0 €
Supabase Free:         0 €
Stripe:              240 €
Domaine:              12 €
──────────────────────────
TOTAL:               252 €/an (2,1% du CA)
```

**Année 2 (36 000 € CA)**:
```
Vercel Pro:          216 €
Supabase Pro:        276 €
Stripe:              690 €
Domaine:              12 €
──────────────────────────
TOTAL:             1 194 €/an (3,3% du CA)
```

---

### Avec LemonSqueezy (International)

**Année 1 (12 000 € CA)**:
```
Vercel Free:           0 €
Supabase Free:         0 €
LemonSqueezy:        900 €
Domaine:              12 €
──────────────────────────
TOTAL:               912 €/an (7,6% du CA)
```

**⚠️ SEULEMENT si ventes internationales importantes**

---

## ✅ Décision Recommandée

### Pour Fleurs Comflorie (Ventes Locales/France)

**Supprimer LemonSqueezy** et utiliser:

**Option 1 (Meilleure économie)**: **Sumup** - 1,39%
**Option 2 (Meilleur compromis)**: **Stripe** - 1,5-2%
**Option 3 (100% français)**: **PayPlug** - 1,5-2%

**Économie vs LemonSqueezy**:
- Année 1: **660-733 € économisés**
- Année 2: **2010-2200 € économisés**
- Sur 3 ans: **~ 5000 € économisés** 🎉

---

## 🔄 Plan de Migration

### Étape 1: Choisir la Solution
**Recommandation**: Sumup ou Stripe

### Étape 2: Créer un Compte
- Sumup: https://sumup.fr/
- Stripe: https://stripe.com/fr

### Étape 3: Remplacer le Code
**Temps estimé**: 2-3 heures
**Fichiers à modifier**:
- `lib/lemonsqueezy.ts` → `lib/stripe.ts` ou `lib/sumup.ts`
- `app/api/webhooks/lemonsqueezy/route.ts` → nouveau webhook
- Mettre à jour les références dans les composants

### Étape 4: Tester
- Tester en mode sandbox/test
- Vérifier les webhooks
- Tester une vraie transaction (1 €)

### Étape 5: Déployer
- Mettre à jour les variables d'environnement
- Déployer sur Vercel
- Surveiller les premières transactions

---

**Conclusion**: **LemonSqueezy = inutile pour ventes France**. Utilise Sumup ou Stripe pour économiser 5000 €+ sur 3 ans ! 🚀
