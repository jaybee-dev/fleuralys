-- Table pour gérer les fermetures exceptionnelles (vacances, jours spéciaux, etc.)
CREATE TABLE IF NOT EXISTS fermetures_exceptionnelles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  raison TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index sur la date pour recherches rapides
CREATE INDEX IF NOT EXISTS idx_fermetures_date ON fermetures_exceptionnelles(date);

-- RLS (Row Level Security)
ALTER TABLE fermetures_exceptionnelles ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut lire les fermetures (pour vérifier disponibilité)
CREATE POLICY "Les fermetures sont lisibles par tous"
  ON fermetures_exceptionnelles
  FOR SELECT
  USING (true);

-- Politique : Seuls les admins authentifiés peuvent créer/modifier/supprimer
CREATE POLICY "Seuls les admins peuvent gérer les fermetures"
  ON fermetures_exceptionnelles
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_fermetures_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER trigger_update_fermetures_updated_at
  BEFORE UPDATE ON fermetures_exceptionnelles
  FOR EACH ROW
  EXECUTE FUNCTION update_fermetures_updated_at();

-- Exemples de données (à supprimer ou adapter selon vos besoins)
INSERT INTO fermetures_exceptionnelles (date, raison) VALUES
  ('2025-08-01', 'Congés d''été'),
  ('2025-08-02', 'Congés d''été'),
  ('2025-08-03', 'Congés d''été'),
  ('2025-08-04', 'Congés d''été'),
  ('2025-08-05', 'Congés d''été')
ON CONFLICT (date) DO NOTHING;
