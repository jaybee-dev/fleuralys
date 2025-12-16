import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * API pour gérer les horaires réguliers (admin)
 * PUT /api/admin/horaires - Met à jour les horaires
 */

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { horaires } = body

    if (!horaires) {
      return NextResponse.json({ error: 'Horaires requis' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Mettre à jour chaque jour dans la base de données
    for (const [jour, config] of Object.entries(horaires)) {
      const horaireConfig = config as { ouvert: boolean; plages?: { debut: string; fin: string }[] }

      const { error } = await supabase
        .from('horaires_ouverture')
        .upsert({
          jour,
          ouvert: horaireConfig.ouvert,
          plages: horaireConfig.plages || null,
        }, {
          onConflict: 'jour'
        })

      if (error) {
        console.error(`Erreur mise à jour horaires pour ${jour}:`, error)
        return NextResponse.json({ error: `Erreur mise à jour ${jour}` }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur mise à jour horaires:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
