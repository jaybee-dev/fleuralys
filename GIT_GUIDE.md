# 🔧 Guide Git - Fleurs Comflorie

**Projet**: Site Fleurs Comflorie
**Dépôt local**: `/media/jaybee/Crucial_SSD/DEV/projects/fleurs-comflorie`
**Branche principale**: `main`

---

## ✅ État Actuel

- ✅ Dépôt Git initialisé
- ✅ Branche `main` créée
- ✅ Premier commit créé (`6668187`)
- ✅ 101 fichiers versionnés
- ✅ `.env.local` exclu du versioning (sécurité)
- ✅ `.gitignore` correctement configuré

---

## 🎯 Commandes Git Essentielles

### Vérifier l'état du dépôt

```bash
git status
```

### Voir l'historique des commits

```bash
# Liste simple
git log --oneline

# Liste détaillée
git log

# Avec graphique
git log --oneline --graph --all
```

### Créer un nouveau commit

```bash
# 1. Ajouter les fichiers modifiés
git add .

# Ou ajouter un fichier spécifique
git add chemin/vers/fichier.ts

# 2. Créer le commit
git commit -m "Description du changement"
```

### Voir les différences

```bash
# Différences non stagées
git diff

# Différences stagées (avant commit)
git diff --staged

# Différences avec un commit spécifique
git diff 6668187
```

---

## 🌿 Gestion des Branches

### Créer une branche de développement

```bash
# Créer et basculer sur une nouvelle branche
git checkout -b dev

# Ou en deux étapes
git branch dev
git checkout dev
```

### Lister les branches

```bash
git branch
```

### Changer de branche

```bash
git checkout main
git checkout dev
```

### Fusionner une branche

```bash
# Se placer sur la branche de destination (ex: main)
git checkout main

# Fusionner la branche dev dans main
git merge dev
```

### Supprimer une branche

```bash
# Supprimer une branche locale
git branch -d dev

# Forcer la suppression
git branch -D dev
```

---

## 🚀 Configuration GitHub (Optionnel)

### 1. Créer un dépôt GitHub

1. Va sur [github.com](https://github.com)
2. Clique sur "New repository"
3. Nom suggéré: `fleuralys`
4. **NE COCHE PAS** "Initialize with README" (tu en as déjà un)
5. Clique "Create repository"

### 2. Lier le dépôt local à GitHub

```bash
# Ajouter le remote
git remote add origin https://github.com/TON_USERNAME/fleuralys.git

# Vérifier
git remote -v
```

### 3. Pousser le code sur GitHub

```bash
# Première fois (avec -u pour tracker la branche)
git push -u origin main

# Les fois suivantes
git push
```

### 4. Récupérer les changements depuis GitHub

```bash
# Récupérer et fusionner
git pull

# Ou en deux étapes
git fetch
git merge origin/main
```

---

## 🔐 Sécurité - Fichiers à Ne JAMAIS Commiter

Ces fichiers sont déjà exclus par le `.gitignore` :

- ❌ `.env.local` - Contient tes clés Supabase
- ❌ `.env` - Variables d'environnement sensibles
- ❌ `node_modules/` - Dépendances (trop volumineuses)
- ❌ `.next/` - Build temporaire
- ❌ `*.pem` - Clés privées

### Vérifier qu'un fichier sensible n'est pas tracké

```bash
# Vérifier si .env.local est tracké (doit être vide)
git ls-files | grep "\.env\.local"

# Lister tous les fichiers versionnés
git ls-files
```

### Si tu as commité un fichier sensible par erreur

```bash
# Supprimer du versioning mais garder en local
git rm --cached .env.local

# Commit la suppression
git commit -m "Remove sensitive file from version control"
```

---

## 📝 Workflow Recommandé

### Pour Développer une Nouvelle Fonctionnalité

```bash
# 1. Créer une branche de feature
git checkout -b feature/nom-de-la-fonctionnalite

# 2. Développer et tester

# 3. Commiter régulièrement
git add .
git commit -m "Add: description des changements"

# 4. Revenir sur main et fusionner
git checkout main
git merge feature/nom-de-la-fonctionnalite

# 5. Supprimer la branche feature
git branch -d feature/nom-de-la-fonctionnalite

# 6. Pousser sur GitHub (si configuré)
git push
```

### Pour Corriger un Bug

```bash
# 1. Créer une branche de fix
git checkout -b fix/nom-du-bug

# 2. Corriger le bug

# 3. Commiter
git add .
git commit -m "Fix: description du bug corrigé"

# 4. Fusionner dans main
git checkout main
git merge fix/nom-du-bug

# 5. Supprimer la branche
git branch -d fix/nom-du-bug
```

---

## 🏷️ Bonnes Pratiques de Messages de Commit

### Format Recommandé

```
Type: Description courte (50 caractères max)

Description détaillée optionnelle (si nécessaire)
Explique le "pourquoi" plutôt que le "quoi"
```

### Types de Commits

- `Add:` - Nouvelle fonctionnalité
- `Fix:` - Correction de bug
- `Update:` - Mise à jour de fonctionnalité existante
- `Refactor:` - Refactoring de code
- `Style:` - Changements de style/CSS
- `Docs:` - Documentation
- `Security:` - Améliorations de sécurité
- `Test:` - Ajout/modification de tests
- `Chore:` - Tâches de maintenance

### Exemples de Bons Messages

```bash
git commit -m "Add: Upload d'images pour les bouquets"
git commit -m "Fix: Validation email dans le formulaire de commande"
git commit -m "Security: Ajout du rate limiting sur l'API orders"
git commit -m "Update: Amélioration de l'effet voile sur les boutons"
git commit -m "Docs: Ajout du guide de tests de sécurité"
```

---

## 🔄 Annuler des Changements

### Annuler les modifications non commitées

```bash
# Annuler les modifications d'un fichier
git checkout -- fichier.ts

# Annuler toutes les modifications
git checkout -- .
```

### Annuler un commit (mais garder les modifications)

```bash
# Annuler le dernier commit
git reset --soft HEAD~1

# Les fichiers restent modifiés, tu peux recommiter
```

### Annuler un commit (et perdre les modifications)

```bash
# ⚠️ ATTENTION: Supprime définitivement les changements
git reset --hard HEAD~1
```

### Revenir à un commit spécifique

```bash
# Voir l'historique
git log --oneline

# Revenir à un commit (ex: 6668187)
git reset --hard 6668187
```

---

## 📊 Statistiques du Projet

### Nombre de commits

```bash
git rev-list --count main
```

### Statistiques par fichier

```bash
git log --stat
```

### Contributeurs

```bash
git shortlog -s -n
```

### Fichiers les plus modifiés

```bash
git log --all --format=format: --name-only | sort | uniq -c | sort -r | head -20
```

---

## 🆘 Aide

### Documentation Git

```bash
# Aide générale
git help

# Aide sur une commande spécifique
git help commit
git help merge
```

### Ressources

- [Documentation Git officielle](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

---

## 📦 État Actuel du Projet

```
Commit actuel: 6668187
Branche: main
Fichiers versionnés: 101
Taille du dépôt: ~11,391 lignes de code
```

### Fichiers Clés Versionnés

- ✅ Code source complet (`app/`, `components/`, `lib/`)
- ✅ Configuration (`next.config.js`, `tsconfig.json`)
- ✅ Documentation (`*.md`)
- ✅ Scripts SQL (`supabase_policies.sql`)
- ✅ Scripts de test (`test-*.sh`)
- ✅ Exemple de configuration (`.env.local.example`)

### Fichiers Exclus (Sécurité)

- 🔒 `.env.local` - Clés Supabase
- 🔒 `node_modules/` - Dépendances
- 🔒 `.next/` - Build

---

## 🎯 Prochaines Étapes Suggérées

1. **Créer un dépôt GitHub** (optionnel)

   - Backup dans le cloud
   - Collaboration facilitée
   - Historique accessible partout

2. **Créer une branche `dev`** (recommandé)

   ```bash
   git checkout -b dev
   ```

   - Développer sur `dev`
   - Fusionner dans `main` uniquement quand stable

3. **Tag la version 1.0.0**

   ```bash
   git tag -a v1.0.0 -m "Version 1.0.0 - Release initiale"
   ```

4. **Configurer un `.gitattributes`** (optionnel)
   - Pour normaliser les fins de ligne

---

**Bonne gestion de versions ! 🚀**
