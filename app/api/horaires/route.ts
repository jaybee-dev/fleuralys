import { NextResponse } from 'next/server'
import { getHorairesSemaine } from '@/lib/horaires'

/**
 * API pour récupérer les horaires d'ouverture de la semaine
 * GET /api/horaires
 */
export async function GET() {
  try {
    const horaires = await getHorairesSemaine()
    return NextResponse.json({ horaires })
  } catch (error) {
    console.error('Erreur récupération horaires:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
