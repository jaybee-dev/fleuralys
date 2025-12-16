import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendPaymentConfirmationEmail, sendFloristNotificationEmail } from '@/lib/email'

/**
 * Webhook appelé après un paiement réussi
 * Met à jour le statut de la commande et envoie l'email de confirmation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { commande_id, checkout_id } = body

    if (!commande_id) {
      return NextResponse.json(
        { error: 'commande_id manquant' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Récupérer la commande
    const { data: commande, error: fetchError } = await supabase
      .from('commandes')
      .select('*')
      .eq('id', commande_id)
      .single()

    if (fetchError || !commande) {
      console.error('Erreur récupération commande:', fetchError)
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      )
    }

    // Mettre à jour le statut de la commande
    const { error: updateError } = await supabase
      .from('commandes')
      .update({
        paiement_statut: 'paye',
        statut: 'confirmee',
        paiement_id: checkout_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', commande_id)

    if (updateError) {
      console.error('Erreur mise à jour commande:', updateError)
      return NextResponse.json(
        { error: 'Erreur mise à jour commande' },
        { status: 500 }
      )
    }

    // Envoyer les emails de confirmation (paiement + notification fleuriste)
    const updatedCommande = {
      ...commande,
      paiement_statut: 'paye' as const,
      statut: 'confirmee' as const,
      paiement_id: checkout_id
    }

    Promise.all([
      sendPaymentConfirmationEmail(updatedCommande),
      sendFloristNotificationEmail(updatedCommande)
    ]).catch(err => {
      console.error('Erreur envoi emails:', err)
    })

    return NextResponse.json({
      success: true,
      message: 'Commande mise à jour et emails envoyés'
    }, { status: 200 })

  } catch (error) {
    console.error('Erreur webhook payment-success:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
