import { NextRequest, NextResponse } from 'next/server'
import { getCreneauxDisponibles } from '@/lib/horaires'

/**
 * API pour récupérer les créneaux horaires disponibles pour une date donnée
 * GET /api/horaires/creneaux?date=YYYY-MM-DD
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const dateStr = searchParams.get('date')

    if (!dateStr) {
      return NextResponse.json({ error: 'Date requise' }, { status: 400 })
    }

    const date = new Date(dateStr)

    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 })
    }

    const creneaux = await getCreneauxDisponibles(date)

    return NextResponse.json({ creneaux })
  } catch (error) {
    console.error('Erreur récupération créneaux:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
