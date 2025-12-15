-- Table pour les commandes
CREATE TABLE IF NOT EXISTS commandes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Informations client
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,

  -- Informations commande
  bouquet_id VARCHAR(10) NOT NULL,
  bouquet_nom VARCHAR(255) NOT NULL,
  prix DECIMAL(10, 2) NOT NULL,

  -- Informations retrait
  date_retrait DATE NOT NULL,
  heure_retrait TIME NOT NULL,
  message_carte TEXT,

  -- Statut et paiement
  statut VARCHAR(50) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'prete', 'retiree', 'annulee')),
  paiement_statut VARCHAR(50) DEFAULT 'en_attente' CHECK (paiement_statut IN ('en_attente', 'paye', 'rembourse')),
  paiement_id VARCHAR(255),
  montant_paye DECIMAL(10, 2)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_commandes_statut ON commandes(statut);
CREATE INDEX IF NOT EXISTS idx_commandes_date_retrait ON commandes(date_retrait);
CREATE INDEX IF NOT EXISTS idx_commandes_email ON commandes(email);
CREATE INDEX IF NOT EXISTS idx_commandes_created_at ON commandes(created_at DESC);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_commandes_updated_at
  BEFORE UPDATE ON commandes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Politique RLS (Row Level Security) - pour sécuriser l'accès aux données
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- Politique : Permettre à tous de créer une commande (côté client)
CREATE POLICY "Permettre insertion commandes" ON commandes
  FOR INSERT
  WITH CHECK (true);

-- Politique : Seuls les admins authentifiés peuvent lire toutes les commandes
CREATE POLICY "Admins peuvent lire commandes" ON commandes
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Politique : Seuls les admins authentifiés peuvent modifier les commandes
CREATE POLICY "Admins peuvent modifier commandes" ON commandes
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Politique : Seuls les admins authentifiés peuvent supprimer les commandes
CREATE POLICY "Admins peuvent supprimer commandes" ON commandes
  FOR DELETE
  USING (auth.role() = 'authenticated');
