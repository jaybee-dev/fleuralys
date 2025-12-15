-- ============================================
-- POLITIQUES RLS POUR FLEURISTE SITE
-- ============================================
-- À exécuter dans Supabase SQL Editor
-- Date: 2025-12-15
-- ============================================

-- ⚠️ IMPORTANT: Remplace 'TON_EMAIL_ADMIN@EXEMPLE.COM' par ton vrai email Supabase
-- Tu peux le trouver dans: Authentication > Users

-- ============================================
-- 1. ACTIVER RLS SUR TOUTES LES TABLES
-- ============================================

ALTER TABLE bouquets ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. SUPPRIMER LES ANCIENNES POLITIQUES (si elles existent)
-- ============================================

-- Bouquets
DROP POLICY IF EXISTS "Public Read Access for Bouquets" ON bouquets;
DROP POLICY IF EXISTS "Admin Only Insert Bouquets" ON bouquets;
DROP POLICY IF EXISTS "Admin Only Update Bouquets" ON bouquets;
DROP POLICY IF EXISTS "Admin Only Delete Bouquets" ON bouquets;

-- Commandes
DROP POLICY IF EXISTS "Admin Only Read Commandes" ON commandes;
DROP POLICY IF EXISTS "Public Insert Commandes" ON commandes;
DROP POLICY IF EXISTS "Admin Only Update Commandes" ON commandes;
DROP POLICY IF EXISTS "Admin Only Delete Commandes" ON commandes;

-- Storage
DROP POLICY IF EXISTS "Public Read Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Images" ON storage.objects;

-- ============================================
-- 3. POLITIQUES POUR LA TABLE BOUQUETS
-- ============================================

-- Lecture publique (tout le monde peut voir les bouquets)
CREATE POLICY "Public Read Access for Bouquets"
ON bouquets
FOR SELECT
TO anon, authenticated
USING (true);

-- Insertion admin uniquement
CREATE POLICY "Admin Only Insert Bouquets"
ON bouquets
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- Mise à jour admin uniquement
CREATE POLICY "Admin Only Update Bouquets"
ON bouquets
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- Suppression admin uniquement
CREATE POLICY "Admin Only Delete Bouquets"
ON bouquets
FOR DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- ============================================
-- 4. POLITIQUES POUR LA TABLE COMMANDES
-- ============================================

-- Lecture admin uniquement (protège les données clients)
CREATE POLICY "Admin Only Read Commandes"
ON commandes
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- Insertion publique (les clients peuvent créer des commandes)
-- ⚠️ Protégé par le rate limiter dans l'API
CREATE POLICY "Public Insert Commandes"
ON commandes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Mise à jour admin uniquement
CREATE POLICY "Admin Only Update Commandes"
ON commandes
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- Suppression admin uniquement
CREATE POLICY "Admin Only Delete Commandes"
ON commandes
FOR DELETE
TO authenticated
USING (
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- ============================================
-- 5. POLITIQUES POUR LE STORAGE (bucket: images)
-- ============================================

-- Lecture publique (tout le monde peut voir les images)
CREATE POLICY "Public Read Images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Upload admin uniquement
CREATE POLICY "Authenticated Upload Images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- Suppression admin uniquement
CREATE POLICY "Admin Delete Images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'dev.fleurscomflorie@proton.me'
  )
);

-- ============================================
-- 6. VÉRIFICATION DES POLITIQUES
-- ============================================

-- Liste toutes les politiques pour bouquets
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'bouquets';

-- Liste toutes les politiques pour commandes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'commandes';

-- Liste toutes les politiques pour storage
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'objects' AND schemaname = 'storage';

-- ============================================
-- 7. ALTERNATIVE: TABLE ADMINS (Optionnel - Plus Scalable)
-- ============================================
-- Décommente cette section si tu veux gérer plusieurs admins

/*
-- Créer la table admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS sur la table admins
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Seuls les admins peuvent lire la table admins
CREATE POLICY "Admins can read admins table"
ON admins
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admins)
);

-- Insérer ton premier admin (remplace par ton email)
INSERT INTO admins (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'TON_EMAIL_ADMIN@EXEMPLE.COM'
ON CONFLICT (id) DO NOTHING;

-- Si tu utilises la table admins, remplace dans TOUTES les politiques ci-dessus:
-- auth.uid() IN (SELECT id FROM auth.users WHERE email = 'TON_EMAIL_ADMIN@EXEMPLE.COM')
-- PAR:
-- auth.uid() IN (SELECT id FROM admins)
*/

-- ============================================
-- 8. TESTS DE SÉCURITÉ
-- ============================================

-- Test 1: Vérifier que RLS est activé
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('bouquets', 'commandes');
-- Doit retourner rowsecurity = true pour les deux

-- Test 2: Compter les politiques
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE tablename IN ('bouquets', 'commandes')
GROUP BY tablename;
-- Doit retourner 4 politiques pour chaque table

-- ============================================
-- FIN DU SCRIPT
-- ============================================

-- 📝 PROCHAINES ÉTAPES:
-- 1. Remplace 'TON_EMAIL_ADMIN@EXEMPLE.COM' par ton vrai email (6 occurrences)
-- 2. Exécute ce script dans Supabase SQL Editor
-- 3. Vérifie les résultats des requêtes de vérification
-- 4. Teste dans ton application

-- 🔍 POUR TROUVER TON EMAIL ADMIN:
-- Va dans Supabase Dashboard > Authentication > Users
-- Copie ton email exact (sensible à la casse)
