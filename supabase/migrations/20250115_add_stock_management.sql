-- Table pour les bouquets (catalogue)
CREATE TABLE IF NOT EXISTS bouquets (
  id VARCHAR(10) PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  prix DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  disponible BOOLEAN NOT NULL DEFAULT true,
  lemonsqueezy_product_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_bouquets_updated_at
  BEFORE UPDATE ON bouquets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Politique RLS pour les bouquets
ALTER TABLE bouquets ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les bouquets (côté client)
CREATE POLICY "Permettre lecture bouquets" ON bouquets
  FOR SELECT
  USING (true);

-- Seuls les admins authentifiés peuvent modifier les bouquets
CREATE POLICY "Admins peuvent modifier bouquets" ON bouquets
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Seuls les admins authentifiés peuvent créer des bouquets
CREATE POLICY "Admins peuvent créer bouquets" ON bouquets
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Seuls les admins authentifiés peuvent supprimer des bouquets
CREATE POLICY "Admins peuvent supprimer bouquets" ON bouquets
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insérer les bouquets existants depuis le fichier TypeScript
INSERT INTO bouquets (id, nom, description, prix, image, stock, disponible, lemonsqueezy_product_id) VALUES
  ('1', 'Bouquet Romance', 'Roses rouges et blanches avec des touches de verdure délicate', 45.00, '/images/bouquet-romance.jpg', 10, true, 'prod_romance'),
  ('2', 'Bouquet Printemps', 'Tulipes colorées et fleurs de saison dans un arrangement joyeux', 35.00, '/images/bouquet-printemps.jpg', 15, true, 'prod_printemps'),
  ('3', 'Bouquet Élégance', 'Lys blancs et eucalyptus pour une composition raffinée', 55.00, '/images/bouquet-elegance.jpg', 8, true, 'prod_elegance'),
  ('4', 'Bouquet Champêtre', 'Fleurs des champs et graminées pour un style naturel', 40.00, '/images/bouquet-champetre.jpg', 12, true, 'prod_champetre'),
  ('5', 'Bouquet Passion', 'Pivoines et roses dans des tons roses et fuchsia', 60.00, '/images/bouquet-passion.jpg', 6, true, 'prod_passion'),
  ('6', 'Bouquet Zen', 'Orchidées et bambou pour une ambiance apaisante', 50.00, '/images/bouquet-zen.jpg', 10, true, 'prod_zen')
ON CONFLICT (id) DO NOTHING;
