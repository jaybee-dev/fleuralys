# 🧪 Guide d'Utilisation du Mode Test

## 📋 Table des Matières

1. [Qu'est-ce que le Mode Test ?](#quest-ce-que-le-mode-test)
2. [Activation du Mode Test](#activation-du-mode-test)
3. [Comment Tester un Achat](#comment-tester-un-achat)
4. [Scénarios de Test Disponibles](#scénarios-de-test-disponibles)
5. [Indicateurs Visuels](#indicateurs-visuels)
6. [Désactivation du Mode Test](#désactivation-du-mode-test)
7. [FAQ](#faq)

---

## Qu'est-ce que le Mode Test ?

Le **Mode Test** vous permet de simuler des achats fictifs sans :
- ❌ Débiter de vraie carte bancaire
- ❌ Appeler l'API Sumup réelle
- ❌ Créer de vraies commandes payées

Tout se passe **localement** avec un simulateur de paiement.

---

## Activation du Mode Test

### Étape 1 : Modifier `.env.local`

Ouvrez le fichier `.env.local` et assurez-vous que cette ligne est présente :

```bash
SUMUP_TEST_MODE=true
```

### Étape 2 : Redémarrer le Serveur

Si le serveur est déjà en cours d'exécution, redémarrez-le :

```bash
npm run dev
```

### Étape 3 : Vérifier l'Activation

Visitez `http://localhost:3000` et vous devriez voir une **bannière jaune** en haut de la page :

```
🧪 MODE TEST ACTIVÉ - Aucun paiement réel ne sera effectué
```

✅ Le mode test est maintenant actif !

---

## Comment Tester un Achat

### Flux Complet de Test

1. **Allez sur la page d'accueil**
   ```
   http://localhost:3000
   ```

2. **Choisissez un bouquet** (ou créez-en un depuis la galerie)

3. **Cliquez sur "Commander ce bouquet"**

4. **Remplissez le formulaire de commande**
   - Nom : Votre nom
   - Email : Votre email
   - Téléphone : Votre numéro
   - Date de retrait : Une date dans le futur
   - Heure de retrait : Une heure

5. **Cliquez sur "Confirmer la commande"**

6. **Vous serez redirigé vers le simulateur de paiement** 🎉
   ```
   http://localhost:3000/payment/simulate?checkout_id=...
   ```

7. **Choisissez un scénario de test** (voir section suivante)

---

## Scénarios de Test Disponibles

Sur la page du simulateur, vous avez **3 boutons** pour simuler différents résultats :

### ✅ Paiement Réussi

**Bouton** : `✓ Paiement Réussi` (vert)

**Simule** : Un paiement accepté avec succès

**Résultat** :
- Redirection vers `/payment/success`
- Affiche un message de confirmation
- Commande marquée comme payée

**Utilité** : Tester le parcours nominal (cas où tout se passe bien)

---

### ❌ Paiement Échoué

**Bouton** : `✗ Paiement Échoué` (rouge)

**Simule** : Une carte refusée ou un problème de paiement

**Résultat** :
- Redirection vers `/payment/error`
- Affiche les conseils pour réessayer
- Commande non payée

**Utilité** : Tester la gestion des erreurs de paiement

---

### ← Paiement Annulé

**Bouton** : `← Annuler le Paiement` (gris)

**Simule** : L'utilisateur annule le paiement (clique sur "Retour")

**Résultat** :
- Redirection vers `/payment/cancel`
- Affiche un message d'annulation
- Commande non payée

**Utilité** : Tester le parcours d'abandon de paiement

---

## Indicateurs Visuels

### 🎨 Bannière en Haut de Page

Quand le mode test est activé, une **bannière jaune animée** apparaît en haut de **toutes les pages** :

```
🧪 MODE TEST ACTIVÉ - Aucun paiement réel ne sera effectué
```

**Position** : Sticky (reste visible en scrollant)

---

### 🧪 Badge sur le Simulateur

Sur la page du simulateur, un **badge orange** indique clairement :

```
🧪 TEST MODE
```

---

### ⚠️ Badge sur les Pages de Retour

Sur les pages de succès/erreur/annulation, si le paiement était en mode test :

```
🧪 MODE TEST - Aucun paiement réel effectué
```

---

## Cartes de Test Fictives

Le simulateur affiche des numéros de carte fictifs pour information :

| Numéro de Carte       | Résultat            |
|-----------------------|---------------------|
| `4242 4242 4242 4242` | Paiement réussi     |
| `4000 0000 0000 0002` | Carte refusée       |
| `4000 0000 0000 9995` | Fonds insuffisants  |

**Note** : Ces cartes ne sont **pas utilisées** dans le simulateur (vous cliquez juste sur les boutons), mais elles documentent ce que vous verriez sur la vraie plateforme Sumup en mode test.

---

## Désactivation du Mode Test

### Pour Passer en Production

1. **Modifiez `.env.local`** :

```bash
SUMUP_TEST_MODE=false
```

2. **Configurez les vraies clés Sumup** :

```bash
SUMUP_API_KEY=sup_sk_VOTRE_VRAIE_CLE
SUMUP_MERCHANT_CODE=MXXXXXXXXX
SUMUP_WEBHOOK_SECRET=votre_secret_webhook
```

3. **Redémarrez le serveur** :

```bash
npm run dev
```

4. **Vérifiez** :
   - La bannière jaune doit avoir disparu
   - Les paiements seront maintenant réels via Sumup

⚠️ **ATTENTION** : En production, les paiements seront **réels** et de l'argent sera **débité**.

---

## FAQ

### Q : Puis-je tester avec de vraies cartes en mode test ?

**R** : Non, en mode test, **aucune API Sumup n'est appelée**. Vous cliquez juste sur des boutons pour simuler le résultat. Aucune carte n'est utilisée.

---

### Q : Les commandes créées en mode test sont-elles sauvegardées ?

**R** : Oui, les commandes sont **vraiment créées dans Supabase**, mais elles ne sont **pas payées** (sauf si vous cliquez sur "Paiement Réussi").

Vous pouvez les voir dans l'interface admin `/admin/dashboard`.

---

### Q : Comment différencier une commande test d'une commande réelle ?

**R** : Regardez le `checkout_id` dans la table `commandes` :
- **Mode Test** : `checkout_id` commence par `test_checkout_`
- **Mode Prod** : `checkout_id` ne commence pas par `test_`

---

### Q : Puis-je tester les webhooks Sumup ?

**R** : En mode test, les webhooks sont **désactivés** car aucun appel API réel n'est effectué.

Pour tester les webhooks, vous devez :
1. Passer en mode production (`SUMUP_TEST_MODE=false`)
2. Utiliser les cartes de test Sumup officielles
3. Configurer un tunnel (ngrok) pour recevoir les webhooks

---

### Q : Combien de fois puis-je tester ?

**R** : **Autant de fois que vous voulez** ! Le mode test est totalement gratuit et illimité.

---

### Q : Que se passe-t-il si je laisse `SUMUP_TEST_MODE=true` en production ?

**R** : Les clients verront :
- La bannière jaune "MODE TEST"
- Le simulateur de paiement au lieu de la vraie page Sumup
- Aucun paiement réel ne sera effectué

⚠️ **Très important** : Assurez-vous de mettre `SUMUP_TEST_MODE=false` avant de déployer en production !

---

### Q : Comment forcer un type d'erreur spécifique ?

**R** : Sur le simulateur, cliquez sur le bouton correspondant :
- **Succès** → Bouton vert
- **Échec** → Bouton rouge
- **Annulation** → Bouton gris

Vous pouvez tester tous les scénarios autant de fois que vous voulez.

---

### Q : Les emails sont-ils envoyés en mode test ?

**R** : Ça dépend de votre configuration email. Si vous avez configuré un service d'envoi d'emails (SendGrid, Resend, etc.), les emails **seront envoyés** même en mode test.

💡 **Conseil** : Utilisez une adresse email de test pour éviter de polluer votre boîte.

---

### Q : Le mode test affecte-t-il les performances ?

**R** : Non, le simulateur est **plus rapide** que l'API réelle car il ne fait aucun appel réseau. Les délais de traitement sont simulés (1-2 secondes) pour reproduire une expérience réaliste.

---

## 📚 Ressources Supplémentaires

- [MIGRATION_SUMUP.md](./MIGRATION_SUMUP.md) : Guide de migration vers Sumup
- [POURQUOI_STRIPE_SUMUP.md](./POURQUOI_STRIPE_SUMUP.md) : Comprendre les PSP

---

## 🎯 Résumé Rapide

| Action                  | Commande                                |
|-------------------------|-----------------------------------------|
| **Activer le mode test** | `SUMUP_TEST_MODE=true` dans `.env.local` |
| **Désactiver le mode test** | `SUMUP_TEST_MODE=false` dans `.env.local` |
| **Tester un achat**      | Visitez `/pickup` et suivez le parcours |
| **Voir les commandes**   | Visitez `/admin/dashboard`              |

---

**Bon test ! 🚀**
