import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getFermeturesExceptionnelles } from '@/lib/horaires'

/**
 * API pour gérer les fermetures exceptionnelles (admin)
 * GET /api/admin/fermetures - Liste toutes les fermetures
 * POST /api/admin/fermetures - Crée une nouvelle fermeture
 * DELETE /api/admin/fermetures?id=xxx - Supprime une fermeture
 */

export async function GET() {
  try {
    const fermetures = await getFermeturesExceptionnelles()
    return NextResponse.json({ fermetures })
  } catch (error) {
    console.error('Erreur récupération fermetures:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { date, raison } = await request.json()

    if (!date || !raison) {
      return NextResponse.json({ error: 'Date et raison requises' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('fermetures_exceptionnelles')
      .insert({ date, raison })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Une fermeture existe déjà pour cette date' }, { status: 409 })
      }
      console.error('Erreur création fermeture:', error)
      return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 })
    }

    return NextResponse.json({ fermeture: data })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { error } = await supabase.from('fermetures_exceptionnelles').delete().eq('id', id)

    if (error) {
      console.error('Erreur suppression fermeture:', error)
      return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
