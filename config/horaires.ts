/**
 * Configuration des horaires d'ouverture de la boutique
 *
 * Pour modifier les horaires, éditez ce fichier puis redémarrez le serveur
 */

export interface PlageHoraire {
  debut: string // Format HH:mm
  fin: string   // Format HH:mm
}

export interface HoraireJour {
  ouvert: boolean
  plages?: PlageHoraire[]
}

export interface HorairesConfig {
  lundi: HoraireJour
  mardi: HoraireJour
  mercredi: HoraireJour
  jeudi: HoraireJour
  vendredi: HoraireJour
  samedi: HoraireJour
  dimanche: HoraireJour
}

/**
 * Horaires d'ouverture de la boutique
 * Modifiez ces valeurs selon vos besoins
 */
export const HORAIRES_OUVERTURE: HorairesConfig = {
  lundi: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:00' },
      { debut: '16:00', fin: '19:00' },
    ],
  },
  mardi: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:00' },
      { debut: '16:00', fin: '19:00' },
    ],
  },
  mercredi: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:00' },
      { debut: '16:00', fin: '19:00' },
    ],
  },
  jeudi: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:00' },
      { debut: '16:00', fin: '19:00' },
    ],
  },
  vendredi: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:00' },
      { debut: '16:00', fin: '19:00' },
    ],
  },
  samedi: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:30' },
      { debut: '16:00', fin: '19:30' },
    ],
  },
  dimanche: {
    ouvert: true,
    plages: [
      { debut: '09:00', fin: '12:30' },
    ],
  },
}

/**
 * Jours fériés français automatiquement fermés
 */
export const JOURS_FERIES_FR = [
  { mois: 1, jour: 1, nom: 'Jour de l\'an' },
  { mois: 5, jour: 1, nom: 'Fête du travail' },
  { mois: 5, jour: 8, nom: 'Victoire 1945' },
  { mois: 7, jour: 14, nom: 'Fête nationale' },
  { mois: 8, jour: 15, nom: 'Assomption' },
  { mois: 11, jour: 1, nom: 'Toussaint' },
  { mois: 11, jour: 11, nom: 'Armistice 1918' },
  { mois: 12, jour: 25, nom: 'Noël' },
  { mois: 12, jour: 26, nom: 'Lendemain de Noël' },
]

/**
 * Délai minimum pour passer commande (en heures)
 * Par défaut : 24h à l'avance
 */
export const DELAI_COMMANDE_HEURES = 24

/**
 * Créneau horaire par défaut (en minutes)
 * Les horaires de retrait seront proposés par tranches de X minutes
 */
export const CRENEAU_MINUTES = 30
