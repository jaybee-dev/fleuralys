# 🔧 Corrections du Formulaire de Commande

## Problème Rencontré

L'erreur `"Erreur lors de la creation de la commande"` était causée par une incompatibilité entre :
- La page `/pickup` qui appelait `/api/orders`
- L'API `/api/orders` qui attendait un format de données différent (`date_heure`)
- La vraie API `/api/commandes` qui utilise le bon format (`date_retrait` + `heure_retrait`)

## ✅ Corrections Apportées

### 1. Mise à Jour du Schéma de Validation

**Avant** (pickup/page.tsx ligne 10-16) :
```typescript
const commandeSchema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10),
  bouquet_id: z.string().min(1),
  date_heure: z.string().min(1),  // ❌ Ancien format
})
```

**Après** :
```typescript
const commandeSchema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10),
  bouquet_id: z.string().min(1),
  date_retrait: z.string().min(1),    // ✅ Nouveau format
  heure_retrait: z.string().min(1),   // ✅ Nouveau format
  message_carte: z.string().optional(), // ✅ Ajouté
})
```

### 2. Changement d'API Endpoint

**Avant** (pickup/page.tsx ligne 47) :
```typescript
const response = await fetch('/api/orders', {  // ❌ Mauvaise API
  method: 'POST',
  // ...
})
```

**Après** :
```typescript
const response = await fetch('/api/commandes', {  // ✅ Bonne API
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nom: data.nom,
    email: data.email,
    telephone: data.telephone,
    bouquet_id: data.bouquet_id,
    bouquet_nom: selectedBouquet.nom,    // ✅ Ajouté
    prix: selectedBouquet.prix,          // ✅ Ajouté
    date_retrait: data.date_retrait,     // ✅ Nouveau format
    heure_retrait: data.heure_retrait,   // ✅ Nouveau format
    message_carte: data.message_carte,   // ✅ Ajouté
  }),
})
```

### 3. Mise à Jour du Formulaire HTML

**Avant** - Un seul champ `datetime-local` :
```tsx
<input
  type="datetime-local"
  id="date_heure"
  {...register('date_heure')}
  min={minDateTimeString}
/>
```

**Après** - Deux champs séparés + message carte :

```tsx
{/* Date de retrait */}
<input
  type="date"
  id="date_retrait"
  {...register('date_retrait')}
  min={minDateString}
/>

{/* Heure de retrait */}
<select
  id="heure_retrait"
  {...register('heure_retrait')}
>
  <option value="">Selectionnez une heure</option>
  <option value="09:00">09:00</option>
  <option value="09:30">09:30</option>
  {/* ... autres heures ... */}
  <option value="18:00">18:00</option>
</select>

{/* Message carte (optionnel) */}
<textarea
  id="message_carte"
  {...register('message_carte')}
  rows={3}
  placeholder="Votre message personnalise..."
/>
```

## 🎯 Améliorations

### Meilleure UX
- **Sélection d'heure** : Menu déroulant avec créneaux horaires prédéfinis (09:00 - 18:00)
- **Message carte** : Nouveau champ pour personnaliser le bouquet
- **Validation** : Date minimale = J+1 (commande 24h à l'avance)

### Données Complètes
Toutes les informations nécessaires sont maintenant envoyées :
- ✅ `bouquet_nom` : Nom du bouquet pour référence
- ✅ `prix` : Prix du bouquet
- ✅ `date_retrait` : Date séparée
- ✅ `heure_retrait` : Heure séparée
- ✅ `message_carte` : Message personnalisé (optionnel)

## 📝 Flux Complet Après Correction

1. **Client remplit le formulaire** sur `/pickup`
   - Nom, email, téléphone
   - Choix du bouquet
   - Date de retrait (J+1 minimum)
   - Heure de retrait (créneaux prédéfinis)
   - Message pour la carte (optionnel)

2. **Soumission du formulaire**
   - Appel à `/api/commandes` avec toutes les données
   - Création de la commande dans Supabase
   - Statut initial : `en_attente`
   - Paiement initial : `en_attente`

3. **Création du paiement**
   - Appel à `/api/create-payment`
   - Création d'une session Sumup (ou simulateur si mode test)
   - Redirection vers la page de paiement

4. **Paiement** (Mode Test activé)
   - Redirection vers `/payment/simulate`
   - Affichage du simulateur avec 3 options :
     - ✅ Paiement Réussi
     - ❌ Paiement Échoué
     - ← Paiement Annulé

5. **Retour après paiement**
   - `/payment/success` : Commande confirmée
   - `/payment/error` : Erreur de paiement
   - `/payment/cancel` : Paiement annulé

## 🧪 Pour Tester

```bash
# 1. Le serveur est déjà en cours d'exécution sur http://localhost:3000

# 2. Visitez la page de commande
http://localhost:3000/pickup?bouquet=2

# 3. Remplissez le formulaire
# 4. Cliquez sur "Commander et payer en ligne"
# 5. Vous serez redirigé vers le simulateur de paiement
# 6. Testez les 3 scénarios
```

## ✅ Résultat

Le formulaire fonctionne maintenant correctement et :
- ✅ Crée la commande dans Supabase
- ✅ Envoie toutes les données nécessaires
- ✅ Redirige vers le simulateur de paiement (mode test)
- ✅ Gère les 3 scénarios de paiement

---

**Date de correction** : 2025-12-16
