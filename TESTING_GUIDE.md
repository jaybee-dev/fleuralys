# 🧪 Guide de Tests - Améliorations de Sécurité

**Date**: 2025-12-15
**Projet**: Site Fleuriste
**Version**: 1.0.0

---

## 📋 Checklist Complète des Tests

### ✅ Avant de Commencer

- [ ] Le serveur de dev est lancé (`npm run dev`)
- [ ] Tu es connecté en tant qu'admin dans l'application
- [ ] Supabase RLS est configuré (policies activées)
- [ ] Le bucket `images` existe dans Supabase Storage

---

## 🧪 Test 1: Validation Upload d'Images

**Objectif**: Vérifier que seules les images valides peuvent être uploadées

### Étapes

1. **Accède à la page de gestion des bouquets**
   ```
   http://localhost:3000/admin/bouquets
   ```

2. **Clique sur "Ajouter un bouquet"**

3. **Teste les scenarios suivants**:

#### ✅ Devrait RÉUSSIR:
- [ ] Upload d'une image JPG valide (< 5 MB, > 200x200)
- [ ] Upload d'une image PNG valide
- [ ] Upload d'une image WebP valide
- [ ] Upload d'une image de 200x200 pixels exactement
- [ ] Upload d'une image de 4000x4000 pixels exactement

#### ❌ Devrait ÉCHOUER avec message d'erreur:
- [ ] Upload d'un fichier > 5 MB
  - **Message attendu**: "L'image ne doit pas dépasser 5 MB"
- [ ] Upload d'un fichier .exe renommé en .jpg
  - **Message attendu**: "Format non supporté. Utilisez JPG, PNG ou WebP"
- [ ] Upload d'un PDF renommé en .jpg
  - **Message attendu**: "Extension de fichier invalide"
- [ ] Upload d'une image < 200x200 pixels
  - **Message attendu**: "L'image doit faire au minimum 200x200 pixels"
- [ ] Upload d'une image > 4000x4000 pixels
  - **Message attendu**: "L'image ne doit pas dépasser 4000x4000 pixels"

### Vérifications Supplémentaires

1. **Vérifie que le nom de fichier est sécurisé**:
   - Va dans Supabase Dashboard > Storage > images > bouquets
   - Les fichiers doivent avoir un nom type: `1734287654321-a7b3c8d2-1e4f-5a6b-7c8d-9e0f1a2b3c4d.jpg`
   - Format: `{timestamp}-{uuid}.{extension}`

2. **Vérifie qu'on ne peut pas écraser un fichier**:
   - Upload la même image 2 fois
   - Les 2 fichiers doivent avoir des noms différents

---

## 🧪 Test 2: Rate Limiting API

**Objectif**: Vérifier que l'API bloque après 5 requêtes par heure

### Méthode Automatique (Recommandée)

```bash
# Exécute le script de test
./test-rate-limit.sh
```

**Résultats attendus**:
- Requêtes 1-5: ✅ HTTP 201 (Created)
- Requête 6+: ❌ HTTP 429 (Too Many Requests)

### Méthode Manuelle

```bash
# Envoie 6 requêtes rapidement
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/orders \
    -H "Content-Type: application/json" \
    -d '{
      "nom":"Test",
      "email":"test'$i'@test.com",
      "telephone":"0123456789",
      "bouquet_id":"123e4567-e89b-12d3-a456-426614174000",
      "date_heure":"2025-12-20T10:00:00"
    }'
  echo ""
  sleep 0.5
done
```

### Vérifications

- [ ] Les 5 premières requêtes retournent HTTP 201
- [ ] La 6ème requête retourne HTTP 429
- [ ] Le message d'erreur contient "Trop de requêtes"
- [ ] Les headers suivants sont présents:
  - `X-RateLimit-Limit: 5`
  - `X-RateLimit-Remaining: 0` (après 5 requêtes)
  - `X-RateLimit-Reset: {timestamp}`

### Reset du Rate Limiter

```bash
# Pour réinitialiser le rate limiter, redémarre le serveur:
pkill -f "next dev"
npm run dev
```

---

## 🧪 Test 3: En-têtes de Sécurité HTTP

**Objectif**: Vérifier que tous les en-têtes de sécurité sont présents

### Méthode Automatique (Recommandée)

```bash
# Exécute le script de test
./test-security-headers.sh
```

**Résultats attendus**: Tous les en-têtes doivent être marqués ✅ PRÉSENT

### Méthode Manuelle

```bash
# Récupère les en-têtes HTTP
curl -I http://localhost:3000
```

### Vérifications

Vérifie la présence de ces en-têtes:

- [ ] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [ ] `Content-Security-Policy: default-src 'self'; script-src ...`

---

## 🧪 Test 4: Politiques RLS Supabase

**Objectif**: Vérifier que seul l'admin peut modifier les bouquets et lire les commandes

### Test 4.1: Lecture des Bouquets (Public)

```bash
# Test avec utilisateur anonyme (devrait fonctionner)
curl -X GET 'https://nxhdclyqqrkzsliczkre.supabase.co/rest/v1/bouquets' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aGRjbHlxcXJrenNsaWN6a3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzQ2MzEsImV4cCI6MjA4MTM1MDYzMX0.RSVWHmRgBQZVtFVm1EYYNy5cm7LGyVyePuNXw_EQGmI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aGRjbHlxcXJrenNsaWN6a3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzQ2MzEsImV4cCI6MjA4MTM1MDYzMX0.RSVWHmRgBQZVtFVm1EYYNy5cm7LGyVyePuNXw_EQGmI"
```

**Résultat attendu**: ✅ Retourne la liste des bouquets

### Test 4.2: Lecture des Commandes (Admin uniquement)

```bash
# Test avec utilisateur anonyme (devrait ÉCHOUER)
curl -X GET 'https://nxhdclyqqrkzsliczkre.supabase.co/rest/v1/commandes' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aGRjbHlxcXJrenNsaWN6a3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzQ2MzEsImV4cCI6MjA4MTM1MDYzMX0.RSVWHmRgBQZVtFVm1EYYNy5cm7LGyVyePuNXw_EQGmI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aGRjbHlxcXJrenNsaWN6a3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzQ2MzEsImV4cCI6MjA4MTM1MDYzMX0.RSVWHmRgBQZVtFVm1EYYNy5cm7LGyVyePuNXw_EQGmI"
```

**Résultat attendu**: ❌ Retourne `[]` (tableau vide) ou erreur 403

### Test 4.3: Vérification Manuelle dans Supabase

1. **Va dans Supabase Dashboard > Database > Policies**

2. **Vérifie pour la table `bouquets`**:
   - [ ] "Public Read Access for Bouquets" - SELECT - anon, authenticated
   - [ ] "Admin Only Insert Bouquets" - INSERT - authenticated
   - [ ] "Admin Only Update Bouquets" - UPDATE - authenticated
   - [ ] "Admin Only Delete Bouquets" - DELETE - authenticated

3. **Vérifie pour la table `commandes`**:
   - [ ] "Admin Only Read Commandes" - SELECT - authenticated
   - [ ] "Public Insert Commandes" - INSERT - anon, authenticated
   - [ ] "Admin Only Update Commandes" - UPDATE - authenticated
   - [ ] "Admin Only Delete Commandes" - DELETE - authenticated

4. **Vérifie pour `storage.objects`**:
   - [ ] "Public Read Images" - SELECT - public
   - [ ] "Authenticated Upload Images" - INSERT - authenticated
   - [ ] "Admin Delete Images" - DELETE - authenticated

---

## 🧪 Test 5: Logging Sécurisé

**Objectif**: Vérifier que les données sensibles ne sont pas loggées

### Teste en Développement

1. **Regarde les logs du serveur pendant que tu testes l'API**:
   ```bash
   # Le serveur affiche des logs colorés
   npm run dev
   ```

2. **Crée une commande avec des données sensibles**:
   ```bash
   curl -X POST http://localhost:3000/api/orders \
     -H "Content-Type: application/json" \
     -d '{
       "nom":"Test",
       "email":"sensible@test.com",
       "telephone":"0123456789",
       "bouquet_id":"123e4567-e89b-12d3-a456-426614174000",
       "date_heure":"2025-12-20T10:00:00"
     }'
   ```

3. **Vérifie dans les logs**:
   - [ ] L'email apparaît comme `[REDACTED]` (et non `sensible@test.com`)
   - [ ] Le téléphone apparaît comme `[REDACTED]` (et non `0123456789`)
   - [ ] Les logs sont colorés (cyan pour info, jaune pour warn, rouge pour error)

### Simulation Production

```bash
# Lance le serveur en mode production
NODE_ENV=production npm run dev
```

**Vérifications**:
- [ ] Les logs sont en format JSON (pas de couleurs)
- [ ] Les données sensibles sont toujours `[REDACTED]`
- [ ] Chaque log contient: `timestamp`, `level`, `message`

---

## 🧪 Test 6: Validation des Inputs

**Objectif**: Vérifier que les formats email et téléphone sont validés

### Test Email Invalide

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"Test",
    "email":"invalid-email",
    "telephone":"0123456789",
    "bouquet_id":"123e4567-e89b-12d3-a456-426614174000",
    "date_heure":"2025-12-20T10:00:00"
  }'
```

**Résultat attendu**: ❌ HTTP 400 - "Format d'email invalide"

### Test Téléphone Invalide

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "nom":"Test",
    "email":"test@test.com",
    "telephone":"abc",
    "bouquet_id":"123e4567-e89b-12d3-a456-426614174000",
    "date_heure":"2025-12-20T10:00:00"
  }'
```

**Résultat attendu**: ❌ HTTP 400 - "Format de téléphone invalide"

---

## 🧪 Test 7: Boutons avec Effet Voile

**Objectif**: Vérifier l'effet visuel sur tous les boutons

### Étapes

1. **Teste les pages suivantes**:
   - [ ] `/admin/login` - Bouton "Se connecter"
   - [ ] `/admin/dashboard` - Boutons "Gérer les bouquets", "Voir les commandes"
   - [ ] `/admin/bouquets` - Boutons "Ajouter", "Modifier", "Supprimer"
   - [ ] `/admin/commandes` - Bouton "Retour"

2. **Pour chaque bouton, vérifie**:
   - [ ] Le bouton a des bords complètement arrondis (`rounded-full`)
   - [ ] Au survol, un cercle blanc translucide s'agrandit depuis le centre
   - [ ] L'animation est fluide (0.6s)

---

## 📊 Résumé des Tests

Une fois tous les tests effectués, remplis ce tableau:

| Test | Statut | Notes |
|------|--------|-------|
| Upload d'images valides | ☐ ✅ ☐ ❌ | |
| Upload rejeté (> 5 MB) | ☐ ✅ ☐ ❌ | |
| Upload rejeté (type invalide) | ☐ ✅ ☐ ❌ | |
| Upload rejeté (dimensions) | ☐ ✅ ☐ ❌ | |
| Noms de fichiers UUID | ☐ ✅ ☐ ❌ | |
| Rate limiting (429 après 5 req) | ☐ ✅ ☐ ❌ | |
| Headers de rate limit | ☐ ✅ ☐ ❌ | |
| En-têtes HTTP (8 présents) | ☐ ✅ ☐ ❌ | |
| RLS bouquets (lecture publique) | ☐ ✅ ☐ ❌ | |
| RLS commandes (admin seul) | ☐ ✅ ☐ ❌ | |
| RLS storage (policies ok) | ☐ ✅ ☐ ❌ | |
| Logs sanitisés (email/tel) | ☐ ✅ ☐ ❌ | |
| Validation email | ☐ ✅ ☐ ❌ | |
| Validation téléphone | ☐ ✅ ☐ ❌ | |
| Effet voile boutons | ☐ ✅ ☐ ❌ | |

---

## 🐛 Problèmes Courants

### Le rate limiter ne fonctionne pas

**Solution**: Redémarre le serveur pour réinitialiser le cache in-memory
```bash
pkill -f "next dev"
npm run dev
```

### Les en-têtes de sécurité ne s'affichent pas

**Vérifications**:
1. Le fichier `next.config.js` est bien modifié
2. Le serveur a été redémarré après modification
3. Teste avec `curl -I` au lieu du navigateur (le navigateur cache)

### Les images ne s'uploadent pas

**Vérifications**:
1. Le bucket `images` existe dans Supabase Storage
2. Le bucket est public (Settings > Public)
3. Les policies de storage sont bien créées
4. Tu es connecté en tant qu'admin

### RLS bloque tout

**Solution**: Vérifie que ton email admin est bien `dev.fleurscomflorie@proton.me` dans:
1. Supabase > Authentication > Users
2. Le script `supabase_policies.sql`

---

## 🎯 Prochaines Étapes Après les Tests

Une fois tous les tests validés:

1. **Corriger les bugs éventuels** trouvés pendant les tests
2. **Tester en environnement de production** (déploiement Vercel)
3. **Configurer le monitoring** (Sentry/LogRocket optionnel)
4. **Activer 2FA** pour le compte admin (optionnel)

---

## 📚 Ressources

- [Rapport de sécurité complet](SECURITY_FINAL_REPORT.md)
- [Guide RLS Supabase](SUPABASE_RLS_GUIDE.md)
- [Détails des améliorations](SECURITY_IMPROVEMENTS.md)
- [Script SQL](supabase_policies.sql)

---

**Bonne chance avec les tests ! 🚀**
