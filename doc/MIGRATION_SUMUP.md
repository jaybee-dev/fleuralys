# 🔄 Migration LemonSqueezy → Sumup

**Date**: 2025-12-15
**Raison**: Économie de 733 €/an (7,5% → 1,39%)

---

## ✅ Changements Effectués

### Fichiers Supprimés
- ❌ `lib/lemonsqueezy.ts`
- ❌ `app/api/webhooks/lemonsqueezy/route.ts`
- ❌ Package `@lemonsqueezy/lemonsqueezy.js`

### Fichiers Créés
- ✅ `lib/sumup.ts` - Client Sumup avec API
- ✅ `app/api/webhooks/sumup/route.ts` - Webhook pour notifications
- ✅ `.env.local.example` - Mis à jour avec clés Sumup

---

## 📋 Étapes de Configuration

### 1. Créer un Compte Sumup

1. **Inscription**: Va sur [https://sumup.fr/](https://sumup.fr/)
2. **Type de compte**: Choisir "Entreprise"
3. **Informations**: Remplir les informations de l'entreprise
4. **Vérification**: Valider l'email et téléphone
5. **Documents**: Uploader KBIS, pièce d'identité (vérification 24-48h)

---

### 2. Obtenir les Clés API

#### Accéder au Dashboard Développeur

1. Connecte-toi à [https://me.sumup.com/](https://me.sumup.com/)
2. Va dans **Settings** > **API Keys**
3. Clique sur **Create API Key**

#### Générer les Clés

**API Key (Production)**:
- Nom: "Fleurs Comflorie Production"
- Permissions: `payments`, `checkouts`
- **Copie la clé** → `SUMUP_API_KEY`

**API Key (Test)**:
- Nom: "Fleurs Comflorie Test"
- Mode: Test
- **Copie la clé** → Utilise pour les tests

**Merchant Code**:
- Trouve ton code marchand dans **Settings** > **Business Info**
- Format: `MXXXXXXXXX`
- **Copie le code** → `SUMUP_MERCHANT_CODE`

---

### 3. Configurer les Variables d'Environnement

#### Fichier `.env.local`

```bash
# Supabase (existant)
NEXT_PUBLIC_SUPABASE_URL=https://nxhdclyqqrkzsliczkre.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Sumup (nouveau)
SUMUP_API_KEY=sup_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUMUP_MERCHANT_CODE=MXXXXXXXXX
SUMUP_WEBHOOK_SECRET=votre_secret_webhook_genere
NEXT_PUBLIC_URL=http://localhost:3000
```

**⚠️ Important**: Ne JAMAIS commiter ce fichier dans Git !

---

### 4. Générer un Secret Webhook

```bash
# Générer un secret sécurisé
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie le résultat dans `SUMUP_WEBHOOK_SECRET`

---

### 5. Configurer le Webhook dans Sumup

#### Dans le Dashboard Sumup

1. Va dans **Settings** > **Webhooks**
2. Clique sur **Add Webhook**
3. **URL**: `https://ton-domaine.vercel.app/api/webhooks/sumup`
   - En dev: utilise **ngrok** ou **localtunnel** pour tester
4. **Events**: Sélectionne:
   - ✅ `checkout.paid`
   - ✅ `checkout.failed`
   - ✅ `checkout.cancelled`
5. **Secret**: Colle le secret généré à l'étape 4
6. **Save**

#### Tester le Webhook

```bash
# Installer ngrok (pour tests locaux)
npm install -g ngrok

# Exposer ton serveur local
ngrok http 3000

# URL ngrok: https://xxxx-xxxx-xxxx.ngrok.io
# Configure le webhook avec: https://xxxx-xxxx-xxxx.ngrok.io/api/webhooks/sumup
```

---

## 🧪 Tests

### Test 1: Créer un Paiement Test

```typescript
// Test dans la console Node.js
const { createPaymentUrl } = require('./lib/sumup')

createPaymentUrl(
  'test-commande-123',
  'bouquet-test',
  10.00, // 10 euros
  'test@example.com',
  'Jean Dupont',
  'Test Bouquet Roses'
).then(url => {
  console.log('URL de paiement:', url)
})
```

**Résultat attendu**: URL de paiement Sumup

---

### Test 2: Simuler un Paiement

1. **Ouvre l'URL de paiement** générée
2. **Utilise une carte test** (fournie par Sumup)
   - Numéro: `4111 1111 1111 1111`
   - Exp: `12/25`
   - CVV: `123`
3. **Valide le paiement**
4. **Vérifie** que le webhook est appelé
5. **Vérifie** que la commande est mise à jour dans Supabase (`statut: 'paid'`)

---

### Test 3: Vérifier le Webhook

```bash
# Voir les logs du serveur
npm run dev

# Dans un autre terminal, envoyer un webhook test
curl -X POST http://localhost:3000/api/webhooks/sumup \
  -H "Content-Type: application/json" \
  -H "x-sumup-signature: test" \
  -d '{
    "event_type": "checkout.paid",
    "checkout_id": "test-123",
    "checkout_reference": "commande-test-123",
    "amount": 50,
    "currency": "EUR",
    "status": "PAID"
  }'
```

**Résultat attendu**: Logs dans le terminal montrant le traitement du webhook

---

## 📊 Comparaison Avant/Après

### Avant (LemonSqueezy)

```typescript
// lib/lemonsqueezy.ts
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

export function getCheckoutUrl(data: CheckoutData): string {
  // ...
  return `${storeUrl}?${params.toString()}`
}
```

**Commission**: 7,5% (5% LS + 2,5% Stripe)

---

### Après (Sumup)

```typescript
// lib/sumup.ts
export async function createPaymentUrl(
  commandeId: string,
  bouquetId: string,
  amount: number,
  customerEmail: string,
  customerName: string,
  description: string
): Promise<string> {
  const checkout = await createSumupCheckout({
    amount,
    checkout_reference: commandeId,
    description,
    customer: { email: customerEmail, name: customerName },
  })

  return checkout.checkout_url
}
```

**Commission**: 1,39%

---

## 💰 Économies Réalisées

### Année 1 (12 000 € CA)

| Avant (LS) | Après (Sumup) | Économie |
|------------|---------------|----------|
| 900 € | 167 € | **733 €** ✅ |

### Année 2 (36 000 € CA)

| Avant (LS) | Après (Sumup) | Économie |
|------------|---------------|----------|
| 2700 € | 500 € | **2200 €** ✅ |

### Sur 3 ans (Total)

**Économie totale**: **~5000 €** 🎉

---

## 🔍 Fonctionnalités Sumup

### Inclus dans l'API

- ✅ Paiements par carte (Visa, Mastercard, Amex)
- ✅ Apple Pay / Google Pay
- ✅ Interface de paiement hébergée (pas besoin de PCI compliance)
- ✅ Webhooks temps réel
- ✅ Dashboard complet
- ✅ Virements automatiques (2-3 jours)
- ✅ Support français
- ✅ Facturation automatique

### Limites (vs LemonSqueezy)

- ❌ Pas de gestion TVA automatique (mais simple pour France)
- ❌ Pas de "Merchant of Record" (mais pas nécessaire pour ventes France)
- ❌ Pas d'abonnements récurrents (pas nécessaire ici)

---

## 🛠️ Intégration dans l'App

### Où Modifier le Code?

#### Option 1: Intégrer dans le Formulaire de Commande

**Fichier**: `app/(main)/pickup/page.tsx` ou similaire

```typescript
'use client'

import { createPaymentUrl } from '@/lib/sumup'
import { createCommande } from '@/lib/supabase'

export default function CommandePage() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // 1. Créer la commande dans Supabase
    const commande = await createCommande({
      nom,
      email,
      telephone,
      bouquet_id,
      date_heure,
      statut: 'pending'
    })

    // 2. Créer l'URL de paiement Sumup
    const paymentUrl = await createPaymentUrl(
      commande.id,
      bouquet_id,
      montant,
      email,
      nom,
      `Bouquet ${bouquetNom}`
    )

    // 3. Rediriger vers Sumup
    window.location.href = paymentUrl
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulaire de commande */}
    </form>
  )
}
```

---

#### Option 2: Ajouter une Route API

**Fichier**: `app/api/create-payment/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createPaymentUrl } from '@/lib/sumup'
import { createCommande } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Créer la commande
  const commande = await createCommande({
    ...body,
    statut: 'pending'
  })

  // Créer l'URL de paiement
  const paymentUrl = await createPaymentUrl(
    commande.id,
    body.bouquet_id,
    body.montant,
    body.email,
    body.nom,
    body.description
  )

  return NextResponse.json({ paymentUrl })
}
```

---

## 📚 Documentation Sumup

- **API Reference**: https://developer.sumup.com/api/
- **Webhooks**: https://developer.sumup.com/docs/webhooks
- **Dashboard**: https://me.sumup.com/
- **Support**: support@sumup.com

---

## ✅ Checklist de Migration

### Configuration
- [ ] Créer compte Sumup Business
- [ ] Obtenir `SUMUP_API_KEY`
- [ ] Obtenir `SUMUP_MERCHANT_CODE`
- [ ] Générer `SUMUP_WEBHOOK_SECRET`
- [ ] Configurer `.env.local`
- [ ] Configurer webhook dans dashboard Sumup

### Tests
- [ ] Tester création de paiement
- [ ] Tester paiement avec carte test
- [ ] Vérifier réception webhook
- [ ] Vérifier mise à jour commande dans Supabase
- [ ] Tester paiement réel (1 €)

### Déploiement
- [ ] Configurer variables d'environnement sur Vercel
- [ ] Mettre à jour webhook URL en production
- [ ] Déployer sur Vercel
- [ ] Tester en production
- [ ] Surveiller les premiers paiements

### Cleanup
- [ ] Supprimer compte LemonSqueezy (optionnel)
- [ ] Archiver anciennes clés API LemonSqueezy
- [ ] Mettre à jour documentation

---

## 🆘 Troubleshooting

### Erreur: "SUMUP_API_KEY is not configured"

**Solution**: Vérifie que `.env.local` contient bien `SUMUP_API_KEY`

```bash
# Vérifier
cat .env.local | grep SUMUP_API_KEY
```

---

### Erreur: "Invalid signature" sur webhook

**Solution**: Vérifie que `SUMUP_WEBHOOK_SECRET` correspond au secret configuré dans Sumup

---

### Paiement bloqué en "PENDING"

**Causes possibles**:
1. Webhook non configuré
2. URL webhook incorrecte
3. Webhook bloqué par firewall

**Solution**: Vérifie les logs du webhook dans Dashboard Sumup

---

### Carte de test refusée

**Solution**: Utilise les cartes de test officielles Sumup:
- Visa: `4111 1111 1111 1111`
- Mastercard: `5500 0000 0000 0004`

---

## 🎉 Conclusion

Migration terminée ! LemonSqueezy remplacé par Sumup.

**Économie**: 733-2200 €/an selon le CA
**Commission**: 7,5% → 1,39%
**Temps d'intégration**: ~2-3 heures

**Prochaines étapes**:
1. Créer le compte Sumup
2. Configurer les clés API
3. Tester en local
4. Déployer en production

🚀 Prêt à économiser 5000 € sur 3 ans !
