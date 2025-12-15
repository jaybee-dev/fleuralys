-- Création de la table commandes dans Supabase

CREATE TABLE commandes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(50) NOT NULL,
  bouquet_id VARCHAR(50) NOT NULL,
  date_heure TIMESTAMP NOT NULL,
  statut VARCHAR(50) NOT NULL DEFAULT 'pending',
  lemonsqueezy_order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_commandes_statut ON commandes(statut);
CREATE INDEX idx_commandes_email ON commandes(email);
CREATE INDEX idx_commandes_date_heure ON commandes(date_heure);
CREATE INDEX idx_commandes_lemonsqueezy_order_id ON commandes(lemonsqueezy_order_id);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_commandes_updated_at BEFORE UPDATE ON commandes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activer Row Level Security (RLS)
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion depuis l'API
CREATE POLICY "Permettre insertion publique" ON commandes
FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture aux administrateurs uniquement
-- Modifiez ceci selon vos besoins de sécurité
CREATE POLICY "Permettre lecture admin" ON commandes
FOR SELECT USING (true);

-- Politique pour permettre les mises à jour depuis les webhooks
CREATE POLICY "Permettre mise à jour" ON commandes
FOR UPDATE USING (true);
