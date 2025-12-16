-- Table pour gérer les horaires d'ouverture hebdomadaires
CREATE TABLE IF NOT EXISTS horaires_ouverture (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jour TEXT NOT NULL UNIQUE CHECK (jour IN ('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche')),
  ouvert BOOLEAN NOT NULL DEFAULT false,
  plages JSONB, -- Format: [{"debut": "09:00", "fin": "12:00"}, {"debut": "14:00", "fin": "18:00"}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index sur le jour
CREATE INDEX IF NOT EXISTS idx_horaires_jour ON horaires_ouverture(jour);

-- RLS (Row Level Security)
ALTER TABLE horaires_ouverture ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut lire les horaires
CREATE POLICY "Les horaires sont lisibles par tous"
  ON horaires_ouverture
  FOR SELECT
  USING (true);

-- Politique : Seuls les admins authentifiés peuvent modifier
CREATE POLICY "Seuls les admins peuvent gérer les horaires"
  ON horaires_ouverture
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_horaires_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER trigger_update_horaires_updated_at
  BEFORE UPDATE ON horaires_ouverture
  FOR EACH ROW
  EXECUTE FUNCTION update_horaires_updated_at();

-- Données initiales basées sur la configuration actuelle
INSERT INTO horaires_ouverture (jour, ouvert, plages) VALUES
  ('lundi', false, NULL),
  ('mardi', true, '[{"debut": "09:00", "fin": "12:00"}, {"debut": "14:00", "fin": "18:00"}]'::jsonb),
  ('mercredi', true, '[{"debut": "09:00", "fin": "12:00"}, {"debut": "14:00", "fin": "18:00"}]'::jsonb),
  ('jeudi', true, '[{"debut": "09:00", "fin": "12:00"}, {"debut": "14:00", "fin": "18:00"}]'::jsonb),
  ('vendredi', true, '[{"debut": "09:00", "fin": "12:00"}, {"debut": "14:00", "fin": "18:00"}]'::jsonb),
  ('samedi', true, '[{"debut": "09:00", "fin": "13:00"}]'::jsonb),
  ('dimanche', false, NULL)
ON CONFLICT (jour) DO NOTHING;
