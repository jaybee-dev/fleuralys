# 📧 Configuration des Emails avec Resend

## 🎯 Récapitulatif

Le système d'envoi d'emails est maintenant configuré avec 3 types d'emails :

1. **📧 Email de confirmation de commande** → Envoyé au client dès la création de la commande
2. **💳 Email de confirmation de paiement** → Envoyé au client après paiement réussi
3. **🌸 Email de notification fleuriste** → Envoyé à la fleuriste pour chaque nouvelle commande

---

## 📋 Prérequis

Vous avez besoin :
- ✅ Un compte Resend (gratuit jusqu'à 3000 emails/mois)
- ✅ Une clé API Resend
- ✅ Votre domaine configuré (ou utiliser le domaine de test)

---

## 🚀 Étape 1 : Obtenir la clé API Resend

### Si vous n'avez pas encore de compte Resend

1. Allez sur [https://resend.com](https://resend.com)
2. Créez un compte gratuit
3. Confirmez votre email

### Obtenir la clé API

1. Connectez-vous à votre compte Resend
2. Allez dans **Settings** → **API Keys**
3. Cliquez sur **Create API Key**
4. Donnez un nom : `Fleurs com'Florie`
5. Sélectionnez les permissions : **Sending access**
6. Cliquez sur **Add**
7. **Copiez la clé** (elle commence par `re_`)

⚠️ **Important** : Copiez la clé immédiatement, vous ne pourrez plus la voir après !

---

## 🔧 Étape 2 : Configurer les variables d'environnement

Ouvrez le fichier `.env.local` et ajoutez/modifiez ces lignes :

```bash
# Resend (Envoi d'emails)
RESEND_API_KEY=re_VOTRE_CLE_API_ICI
# Email de la fleuriste pour recevoir les notifications de commandes
FLORIST_EMAIL=votre-email@fleurscomflorie.fr
```

### Exemple

```bash
RESEND_API_KEY=re_ABC123xyz456def789ghi012jkl345mno678pqr901stu234vwx567
FLORIST_EMAIL=florie@fleurscomflorie.fr
```

---

## 📧 Étape 3 : Configurer votre domaine (Optionnel mais recommandé)

### Option A : Utiliser le domaine de test (Temporaire)

Par défaut, Resend vous donne un domaine de test :
- Les emails seront envoyés depuis `noreply@resend.dev`
- ✅ Parfait pour tester
- ❌ Pas professionnel pour la production

### Option B : Configurer votre propre domaine (Production)

1. Dans Resend, allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez : `fleurscomflorie.fr`
4. Suivez les instructions pour ajouter les enregistrements DNS :
   - **MX Record**
   - **TXT Record** (SPF)
   - **DKIM** (3 enregistrements)

5. Attendez la vérification (généralement 5-10 minutes)

Une fois configuré, modifiez [lib/email.ts](lib/email.ts) :

```typescript
// Avant (domaine de test)
from: 'Fleurs com\'Florie <noreply@fleurscomflorie.fr>',

// Après (votre domaine)
from: 'Fleurs com\'Florie <noreply@fleurscomflorie.fr>',
```

---

## ✅ Étape 4 : Tester l'envoi d'emails

### Test en mode développement

1. **Démarrez le serveur** (s'il n'est pas déjà en cours)
   ```bash
   npm run dev
   ```

2. **Faites une commande test**
   - Visitez `http://localhost:3000/pickup`
   - Remplissez le formulaire
   - Utilisez **votre vraie adresse email** pour recevoir les emails
   - Soumettez la commande

3. **Vérifiez les logs du serveur**
   Vous devriez voir :
   ```
   Email confirmation commande envoyé: { id: '...', ... }
   Email notification fleuriste envoyé: { id: '...', ... }
   ```

4. **Simulez un paiement**
   - Cliquez sur "✓ Paiement Réussi"
   - Vous devriez recevoir l'email de confirmation de paiement

5. **Vérifiez votre boîte email**
   - Vous devriez avoir reçu 2 emails (confirmation commande + confirmation paiement)
   - La fleuriste devrait avoir reçu 1 email de notification

---

## 📬 Emails envoyés

### 1. Email de confirmation de commande (Client)

**Quand** : Dès la création de la commande

**Contenu** :
- Message de bienvenue
- Numéro de commande
- Détails du bouquet
- Date et heure de retrait
- Message pour la carte (si fourni)
- Adresse de la boutique
- Prochaines étapes

**Couleurs** : Dégradé rose/violet (marque Fleurs com'Florie)

---

### 2. Email de confirmation de paiement (Client)

**Quand** : Après paiement réussi

**Contenu** :
- Grande icône ✓ de succès
- Confirmation du paiement
- Montant payé
- Statut "PAYÉ"
- Rappel de la date et heure de retrait
- Adresse de la boutique

**Couleurs** : Dégradé vert (succès)

---

### 3. Email de notification fleuriste

**Quand** : À chaque nouvelle commande

**Contenu** :
- Alerte "Action requise"
- Numéro de commande
- Détails du bouquet commandé
- Prix
- Statut du paiement
- Informations client (nom, email, téléphone cliquables)
- Date et heure de retrait
- Message pour la carte (si fourni)

**Couleurs** : Violet professionnel

---

## 🔍 Dépannage

### Erreur : "RESEND_API_KEY is not configured"

**Solution** :
1. Vérifiez que `.env.local` contient bien `RESEND_API_KEY`
2. Vérifiez qu'il n'y a pas d'espace avant ou après la clé
3. Redémarrez le serveur :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   npm run dev
   ```

---

### Emails non reçus

**Vérifications** :
1. ✅ Vérifiez les **logs du serveur** - Y a-t-il une erreur ?
2. ✅ Vérifiez votre **dossier spam/courrier indésirable**
3. ✅ Vérifiez que l'**adresse email est correcte**
4. ✅ Sur Resend.com, allez dans **Logs** pour voir si l'email a été envoyé

**Si l'email est marqué comme "Delivered" sur Resend mais non reçu** :
- C'est probablement dans votre spam
- Si vous utilisez le domaine de test `resend.dev`, c'est normal
- Configurez votre propre domaine pour améliorer la délivrabilité

---

### Emails marqués comme spam

**Solutions** :
1. **Configurer votre propre domaine** (voir Étape 3)
2. **Ajouter les enregistrements DNS** :
   - SPF
   - DKIM
   - DMARC (optionnel mais recommandé)

---

### Tester avec un email jetable

Si vous voulez tester sans polluer votre boîte :
- [Temp-Mail.org](https://temp-mail.org/)
- [Guerrilla Mail](https://www.guerrillamail.com/)
- [10 Minute Mail](https://10minutemail.com/)

---

## 📊 Statistiques Resend (Dashboard)

Sur [resend.com/dashboard](https://resend.com/dashboard), vous pouvez voir :
- 📈 Nombre d'emails envoyés
- ✅ Taux de délivrance
- 📖 Taux d'ouverture (si activé)
- 🔗 Clics sur les liens (si activé)
- 📋 Logs détaillés de chaque email

---

## 💰 Limites du plan gratuit

| Métrique | Limite gratuite |
|----------|-----------------|
| **Emails/mois** | 3000 |
| **Emails/jour** | 100 |
| **Domaines** | 1 |
| **Logs** | 30 jours |

**Si vous dépassez** :
- Les emails ne seront plus envoyés
- Vous recevrez une alerte par email
- Vous devrez passer au plan payant (20$/mois pour 50 000 emails)

**Pour la fleuriste** :
- Si vous recevez **30 commandes/jour** → 30×3 = 90 emails/jour → ✅ OK
- Sur 1 mois (30 jours) → 90×30 = 2700 emails/mois → ✅ OK

---

## 🎨 Personnalisation des emails

Les templates se trouvent dans [lib/email.ts](lib/email.ts:90-400)

Vous pouvez modifier :
- Les **couleurs** (dégradés)
- Le **texte** des messages
- Les **informations de contact**
- L'**adresse de la boutique**
- Les **horaires**

---

## 🔐 Sécurité

⚠️ **Ne jamais commit `.env.local`** dans Git !

Le fichier `.gitignore` doit contenir :
```
.env.local
.env*.local
```

✅ Gardez vos clés API **secrètes**

---

## 📞 Support

Si vous avez des problèmes :
1. Consultez la [documentation Resend](https://resend.com/docs)
2. Vérifiez les logs du serveur
3. Vérifiez les logs sur resend.com/dashboard

---

## ✅ Checklist finale

- [ ] Compte Resend créé
- [ ] Clé API copiée
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Serveur redémarré
- [ ] Test de commande effectué
- [ ] Emails reçus (commande + paiement + notification)
- [ ] Domaine configuré (optionnel mais recommandé pour prod)

---

**Félicitations ! Le système d'envoi d'emails est maintenant opérationnel ! 🎉**
