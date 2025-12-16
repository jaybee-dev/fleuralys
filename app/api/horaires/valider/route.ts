import { NextRequest, NextResponse } from 'next/server'
import { estRetraitValide } from '@/lib/horaires'

/**
 * API pour valider une date et heure de retrait
 * POST /api/horaires/valider
 * Body: { date_retrait: 'YYYY-MM-DD', heure_retrait: 'HH:mm' }
 */
export async function POST(request: NextRequest) {
  try {
    const { date_retrait, heure_retrait } = await request.json()

    if (!date_retrait || !heure_retrait) {
      return NextResponse.json({ valide: false, erreur: 'Date et heure requises' }, { status: 400 })
    }

    const validation = await estRetraitValide(date_retrait, heure_retrait)

    return NextResponse.json(validation)
  } catch (error) {
    console.error('Erreur validation horaire:', error)
    return NextResponse.json({ valide: false, erreur: 'Erreur serveur' }, { status: 500 })
  }
}
