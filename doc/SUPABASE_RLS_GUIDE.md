# Guide de Configuration des Politiques RLS Supabase

## 🔐 Politiques de Sécurité Recommandées

### Table: `bouquets`

#### 1. Lecture Publique (SELECT)
**Nom**: `Public Read Access for Bouquets`
```sql
CREATE POLICY "Public Read Access for Bouquets"
ON bouquets
FOR SELECT
TO anon, authenticated
USING (true);
```
- ✅ Permet à tout le monde de voir les bouquets
- Nécessaire pour afficher le catalogue sur le site public

#### 2. Insertion Admin Uniquement (INSERT)
**Nom**: `Admin Only Insert Bouquets`
```sql
CREATE POLICY "Admin Only Insert Bouquets"
ON bouquets
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```
- ⚠️ **IMPORTANT**: Remplace `admin@example.com` par ton vrai email admin

#### 3. Mise à jour Admin Uniquement (UPDATE)
**Nom**: `Admin Only Update Bouquets`
```sql
CREATE POLICY "Admin Only Update Bouquets"
ON bouquets
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```

#### 4. Suppression Admin Uniquement (DELETE)
**Nom**: `Admin Only Delete Bouquets`
```sql
CREATE POLICY "Admin Only Delete Bouquets"
ON bouquets
FOR DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```

---

### Table: `commandes`

#### 1. Lecture Admin Uniquement (SELECT)
**Nom**: `Admin Only Read Commandes`
```sql
CREATE POLICY "Admin Only Read Commandes"
ON commandes
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```
- 🔒 Protège les données sensibles (emails, téléphones clients)

#### 2. Insertion Publique (INSERT)
**Nom**: `Public Insert Commandes`
```sql
CREATE POLICY "Public Insert Commandes"
ON commandes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```
- ✅ Permet aux clients de créer des commandes
- ⚠️ À protéger avec un rate limiter côté application

#### 3. Mise à jour Admin Uniquement (UPDATE)
**Nom**: `Admin Only Update Commandes`
```sql
CREATE POLICY "Admin Only Update Commandes"
ON commandes
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```

#### 4. Suppression Admin Uniquement (DELETE)
**Nom**: `Admin Only Delete Commandes`
```sql
CREATE POLICY "Admin Only Delete Commandes"
ON commandes
FOR DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```

---

## 📦 Storage: Bucket `images`

### Configuration du Bucket
1. **Type**: Public
2. **Taille max par fichier**: 5 MB (configuré dans le code)
3. **Types autorisés**: jpg, png, webp (configuré dans le code)

### Politiques Storage

#### 1. Lecture Publique (SELECT)
**Nom**: `Public Read Images`
```sql
CREATE POLICY "Public Read Images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');
```

#### 2. Upload Admin (INSERT)
**Nom**: `Authenticated Upload Images`
```sql
CREATE POLICY "Authenticated Upload Images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```

#### 3. Suppression Admin (DELETE)
**Nom**: `Admin Delete Images`
```sql
CREATE POLICY "Admin Delete Images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@example.com'
  )
);
```

---

## ✅ Checklist de Vérification

### Étapes dans Supabase Dashboard

1. **Activer RLS sur toutes les tables**
   - [ ] Aller dans `Database` > `Tables` > `bouquets`
   - [ ] Cliquer sur "Enable RLS" si pas déjà fait
   - [ ] Répéter pour `commandes`

2. **Vérifier les politiques existantes**
   - [ ] Aller dans `Authentication` > `Policies`
   - [ ] Vérifier que chaque table a les 4 politiques (SELECT, INSERT, UPDATE, DELETE)

3. **Remplacer l'email admin**
   - [ ] Remplacer `admin@example.com` par ton vrai email Supabase
   - [ ] Ceci dans TOUTES les politiques

4. **Tester les politiques**
   - [ ] Se connecter en tant qu'admin
   - [ ] Essayer de créer un bouquet → doit fonctionner
   - [ ] Se déconnecter
   - [ ] Essayer de créer un bouquet → doit échouer
   - [ ] Voir les bouquets en visiteur → doit fonctionner

5. **Storage**
   - [ ] Vérifier que le bucket `images` existe
   - [ ] Vérifier qu'il est public
   - [ ] Appliquer les 3 politiques storage ci-dessus

---

## 🔍 Test des Politiques RLS

### Test 1: Lecture Publique des Bouquets
```javascript
// Dans la console du navigateur (déconnecté)
const { data, error } = await supabase
  .from('bouquets')
  .select('*')

console.log(data) // Doit afficher les bouquets
```

### Test 2: Modification Interdite pour Public
```javascript
// Dans la console du navigateur (déconnecté)
const { data, error } = await supabase
  .from('bouquets')
  .update({ prix: 999 })
  .eq('id', '1')

console.log(error) // Doit afficher une erreur de permission
```

### Test 3: Lecture des Commandes (Admin uniquement)
```javascript
// Dans la console du navigateur (déconnecté)
const { data, error } = await supabase
  .from('commandes')
  .select('*')

console.log(data) // Doit être vide ou erreur
```

---

## 🚨 Alertes de Sécurité

### ⚠️ SI tu vois ces comportements, c'est un problème:

1. **Visiteur peut modifier des bouquets** → Politiques UPDATE mal configurées
2. **Visiteur peut voir les commandes** → Politiques SELECT commandes trop permissives
3. **Erreur "permission denied" en tant qu'admin** → Email admin non mis à jour
4. **Visiteur peut uploader des images** → Politiques Storage trop permissives

---

## 📝 Alternative: Utiliser une Table `admins`

Pour plus de flexibilité (plusieurs admins), crée une table `admins`:

```sql
CREATE TABLE admins (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer ton admin
INSERT INTO admins (id, email)
SELECT id, email FROM auth.users WHERE email = 'ton@email.com';
```

Puis dans les politiques, remplace:
```sql
auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@example.com')
```

Par:
```sql
auth.uid() IN (SELECT id FROM admins)
```

C'est plus scalable si tu veux ajouter plusieurs administrateurs.

---

## 🔗 Ressources Utiles

- [Documentation Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)
- [Testing Policies](https://supabase.com/docs/guides/auth/row-level-security#testing-policies)
