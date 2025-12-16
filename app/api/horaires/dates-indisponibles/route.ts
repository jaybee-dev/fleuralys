import { NextResponse } from 'next/server'
import { getFermeturesExceptionnelles, estJourFerie, getHorairesJour } from '@/lib/horaires'
import { DELAI_COMMANDE_HEURES } from '@/config/horaires'

/**
 * API pour récupérer toutes les dates indisponibles pour les commandes
 * GET /api/horaires/dates-indisponibles?mois=2025-01
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const moisParam = searchParams.get('mois') // Format: YYYY-MM

    if (!moisParam) {
      return NextResponse.json({ error: 'Paramètre mois requis' }, { status: 400 })
    }

    const [annee, mois] = moisParam.split('-').map(Number)

    // Récupérer toutes les fermetures exceptionnelles
    const fermeturesExceptionnelles = await getFermeturesExceptionnelles()
    const datesIndisponibles: string[] = []

    // Date minimum (délai de commande)
    const dateMin = new Date()
    dateMin.setHours(dateMin.getHours() + DELAI_COMMANDE_HEURES)

    // Calculer toutes les dates du mois et des mois adjacents (pour le calendrier)
    const dateDebut = new Date(annee, mois - 2, 1) // Mois précédent
    const dateFin = new Date(annee, mois + 1, 0) // Mois suivant

    for (let date = new Date(dateDebut); date <= dateFin; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0]

      // Vérifier si la date est dans le passé ou trop proche
      if (date < dateMin) {
        datesIndisponibles.push(dateStr)
        continue
      }

      // Vérifier jour férié
      const { estFerie } = estJourFerie(date)
      if (estFerie) {
        datesIndisponibles.push(dateStr)
        continue
      }

      // Vérifier horaires réguliers
      const horaires = await getHorairesJour(date)
      if (!horaires.ouvert) {
        datesIndisponibles.push(dateStr)
        continue
      }

      // Vérifier fermetures exceptionnelles
      const fermeture = fermeturesExceptionnelles.find(f => f.date === dateStr)
      if (fermeture) {
        datesIndisponibles.push(dateStr)
      }
    }

    return NextResponse.json({ dates: datesIndisponibles })
  } catch (error) {
    console.error('Erreur récupération dates indisponibles:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
