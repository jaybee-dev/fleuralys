import {
  HORAIRES_OUVERTURE,
  JOURS_FERIES_FR,
  DELAI_COMMANDE_HEURES,
  CRENEAU_MINUTES,
  type HorairesConfig,
  type PlageHoraire,
  type HoraireJour,
} from '@/config/horaires'
import { createAdminClient } from './supabase/admin'

/**
 * Type pour une fermeture exceptionnelle
 */
export interface FermetureExceptionnelle {
  id?: string
  date: string // Format YYYY-MM-DD
  raison: string
  created_at?: string
}

/**
 * Récupère les jours de la semaine en français
 */
const JOURS_SEMAINE = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'] as const
type JourSemaine = typeof JOURS_SEMAINE[number]

/**
 * Vérifie si une date est un jour férié
 */
export function estJourFerie(date: Date): { estFerie: boolean; nom?: string } {
  const mois = date.getMonth() + 1
  const jour = date.getDate()

  const ferie = JOURS_FERIES_FR.find(f => f.mois === mois && f.jour === jour)

  return {
    estFerie: !!ferie,
    nom: ferie?.nom,
  }
}

/**
 * Récupère les horaires depuis la base de données
 */
export async function getHorairesFromDB(): Promise<Record<string, HoraireJour>> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('horaires_ouverture')
      .select('*')
      .order('jour', { ascending: true })

    if (error) {
      console.error('Erreur récupération horaires DB:', error)
      // Fallback sur la config en cas d'erreur
      return HORAIRES_OUVERTURE
    }

    if (!data || data.length === 0) {
      console.log('⚠️ Aucune donnée horaires en DB, utilisation config par défaut')
      return HORAIRES_OUVERTURE
    }

    // Convertir les données DB en format HorairesConfig
    const horaires: Record<string, HoraireJour> = {}
    for (const row of data) {
      horaires[row.jour] = {
        ouvert: row.ouvert,
        plages: row.plages || undefined,
      }
    }

    console.log('✅ Horaires chargés depuis DB:', horaires)
    return horaires
  } catch (error) {
    console.error('Erreur:', error)
    return HORAIRES_OUVERTURE
  }
}

/**
 * Récupère les horaires d'un jour de la semaine
 */
export async function getHorairesJour(date: Date): Promise<HoraireJour> {
  const jourIndex = date.getDay()
  const jourNom = JOURS_SEMAINE[jourIndex] as JourSemaine

  const horaires = await getHorairesFromDB()
  return horaires[jourNom] || HORAIRES_OUVERTURE[jourNom]
}

/**
 * Vérifie si la boutique est ouverte un jour donné
 */
export async function estOuvert(date: Date): Promise<{ ouvert: boolean; raison?: string }> {
  // Vérifier les jours fériés
  const { estFerie, nom: nomFerie } = estJourFerie(date)
  if (estFerie) {
    return { ouvert: false, raison: `Fermé : ${nomFerie}` }
  }

  // Vérifier les horaires normaux
  const horaires = await getHorairesJour(date)
  if (!horaires.ouvert) {
    return { ouvert: false, raison: 'Fermé' }
  }

  // Vérifier les fermetures exceptionnelles
  const dateStr = date.toISOString().split('T')[0]
  const fermeture = await getFermetureExceptionnelle(dateStr)

  if (fermeture) {
    return { ouvert: false, raison: fermeture.raison }
  }

  return { ouvert: true }
}

/**
 * Récupère une fermeture exceptionnelle pour une date donnée
 */
export async function getFermetureExceptionnelle(dateStr: string): Promise<FermetureExceptionnelle | null> {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('fermetures_exceptionnelles')
      .select('*')
      .eq('date', dateStr)
      .maybeSingle()

    if (error) {
      console.error('Erreur récupération fermeture:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erreur:', error)
    return null
  }
}

/**
 * Récupère toutes les fermetures exceptionnelles
 */
export async function getFermeturesExceptionnelles(): Promise<FermetureExceptionnelle[]> {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('fermetures_exceptionnelles')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      console.error('Erreur récupération fermetures:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erreur:', error)
    return []
  }
}

/**
 * Génère les créneaux horaires disponibles pour une date donnée
 */
export async function getCreneauxDisponibles(date: Date): Promise<string[]> {
  const { ouvert } = await estOuvert(date)

  if (!ouvert) {
    return []
  }

  const horaires = await getHorairesJour(date)

  if (!horaires.ouvert || !horaires.plages) {
    return []
  }

  const creneaux: string[] = []

  // Pour chaque plage horaire
  for (const plage of horaires.plages) {
    const [heureDebut, minuteDebut] = plage.debut.split(':').map(Number)
    const [heureFin, minuteFin] = plage.fin.split(':').map(Number)

    const debut = heureDebut * 60 + minuteDebut
    const fin = heureFin * 60 + minuteFin

    // Générer les créneaux par intervalles
    for (let minutes = debut; minutes < fin; minutes += CRENEAU_MINUTES) {
      const heures = Math.floor(minutes / 60)
      const mins = minutes % 60
      const creneau = `${heures.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
      creneaux.push(creneau)
    }
  }

  return creneaux
}

/**
 * Vérifie si une date et heure de retrait est valide
 */
export async function estRetraitValide(
  dateRetrait: string,
  heureRetrait: string
): Promise<{ valide: boolean; erreur?: string }> {
  const maintenant = new Date()
  const dateRetraitObj = new Date(`${dateRetrait}T${heureRetrait}:00`)

  // Vérifier que la date n'est pas dans le passé
  if (dateRetraitObj <= maintenant) {
    return { valide: false, erreur: 'La date de retrait doit être dans le futur' }
  }

  // Vérifier le délai minimum
  const delaiMs = dateRetraitObj.getTime() - maintenant.getTime()
  const delaiHeures = delaiMs / (1000 * 60 * 60)

  if (delaiHeures < DELAI_COMMANDE_HEURES) {
    return {
      valide: false,
      erreur: `Les commandes doivent être passées au moins ${DELAI_COMMANDE_HEURES}h à l'avance`,
    }
  }

  // Vérifier que la boutique est ouverte ce jour-là
  const { ouvert, raison } = await estOuvert(dateRetraitObj)

  if (!ouvert) {
    return { valide: false, erreur: raison || 'La boutique est fermée ce jour-là' }
  }

  // Vérifier que l'heure est dans les créneaux disponibles
  const creneaux = await getCreneauxDisponibles(dateRetraitObj)

  if (!creneaux.includes(heureRetrait)) {
    return { valide: false, erreur: 'Cet horaire n\'est pas disponible' }
  }

  return { valide: true }
}

/**
 * Récupère la date minimum pour une commande
 */
export function getDateMinimumCommande(): string {
  const date = new Date()
  date.setHours(date.getHours() + DELAI_COMMANDE_HEURES)
  return date.toISOString().split('T')[0]
}

/**
 * Formate les horaires pour l'affichage
 */
export function formaterHoraires(plages: PlageHoraire[]): string {
  return plages.map(p => `${p.debut} - ${p.fin}`).join(', ')
}

/**
 * Récupère tous les horaires de la semaine pour affichage
 */
export async function getHorairesSemaine() {
  const horaires = await getHorairesFromDB()

  // Ordre correct des jours : lundi à dimanche
  const ordreJours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

  return ordreJours.map((jour) => ({
    jour: jour.charAt(0).toUpperCase() + jour.slice(1),
    ouvert: horaires[jour]?.ouvert || false,
    horaires: horaires[jour]?.plages ? formaterHoraires(horaires[jour].plages!) : null,
  }))
}
