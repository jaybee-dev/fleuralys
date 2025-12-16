import { NextRequest, NextResponse } from 'next/server'
import { verifySumupWebhook, SumupWebhookEvent } from '@/lib/sumup'
import { supabase } from '@/lib/supabase'
import { logger, logApiError } from '@/lib/logger'
import { sendOrderConfirmationEmail, sendFloristNotificationEmail } from '@/lib/email'

/**
 * Webhook Sumup pour gérer les notifications de paiement
 * Documentation: https://developer.sumup.com/docs/webhooks
 */
export async function POST(request: NextRequest) {
  try {
    // Récupérer le body brut pour vérification signature
    const rawBody = await request.text()
    const signature = request.headers.get('x-sumup-signature') || ''

    // Vérifier la signature du webhook
    const isValid = await verifySumupWebhook(rawBody, signature)

    if (!isValid) {
      logger.warn('Invalid Sumup webhook signature', {
        endpoint: '/api/webhooks/sumup'
      })

      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parser le body
    const event: SumupWebhookEvent = JSON.parse(rawBody)

    logger.info('Sumup webhook received', {
      event_type: event.event_type,
      checkout_id: event.checkout_id,
      checkout_reference: event.checkout_reference,
      status: event.status
    })

    // Traiter selon le type d'événement
    switch (event.event_type) {
      case 'checkout.paid':
        await handlePaymentSuccess(event)
        break

      case 'checkout.failed':
        await handlePaymentFailed(event)
        break

      case 'checkout.cancelled':
        await handlePaymentCancelled(event)
        break

      default:
        logger.warn('Unknown Sumup webhook event type', {
          event_type: event.event_type
        })
    }

    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    logApiError('/api/webhooks/sumup', error)

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Gérer un paiement réussi
 */
async function handlePaymentSuccess(event: SumupWebhookEvent) {
  const commandeId = event.checkout_reference

  try {
    // Mettre à jour le statut de la commande dans Supabase
    const { error: updateError } = await supabase
      .from('commandes')
      .update({
        statut: 'confirmee',
        paiement_statut: 'paye',
        paiement_id: event.checkout_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', commandeId)

    if (updateError) {
      throw updateError
    }

    logger.info('Payment successfully processed', {
      commande_id: commandeId,
      checkout_id: event.checkout_id,
      amount: event.amount
    })

    // Récupérer les données complètes de la commande pour envoyer les emails
    const { data: commande, error: fetchError } = await supabase
      .from('commandes')
      .select('*')
      .eq('id', commandeId)
      .single()

    if (fetchError || !commande) {
      logger.error('Failed to fetch order data for email', fetchError as Error, {
        commande_id: commandeId
      })
      // Ne pas faire échouer le webhook si on ne peut pas envoyer les emails
      return
    }

    // Envoyer les emails de confirmation (en arrière-plan)
    Promise.all([
      sendOrderConfirmationEmail(commande),
      sendFloristNotificationEmail(commande)
    ]).catch(err => {
      logger.error('Failed to send confirmation emails', err as Error, {
        commande_id: commandeId
      })
      // Ne pas faire échouer le webhook si les emails échouent
    })

    logger.info('Confirmation emails sent', {
      commande_id: commandeId,
      customer_email: commande.email
    })

  } catch (error) {
    logger.error('Failed to update payment status', error as Error, {
      commande_id: commandeId,
      checkout_id: event.checkout_id
    })
    throw error
  }
}

/**
 * Gérer un paiement échoué
 */
async function handlePaymentFailed(event: SumupWebhookEvent) {
  const commandeId = event.checkout_reference

  try {
    const { error } = await supabase
      .from('commandes')
      .update({
        statut: 'failed',
        payment_id: event.checkout_id,
        payment_status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', commandeId)

    if (error) {
      throw error
    }

    logger.warn('Payment failed', {
      commande_id: commandeId,
      checkout_id: event.checkout_id
    })

  } catch (error) {
    logger.error('Failed to update failed payment status', error as Error, {
      commande_id: commandeId,
      checkout_id: event.checkout_id
    })
    throw error
  }
}

/**
 * Gérer un paiement annulé
 */
async function handlePaymentCancelled(event: SumupWebhookEvent) {
  const commandeId = event.checkout_reference

  try {
    const { error } = await supabase
      .from('commandes')
      .update({
        statut: 'cancelled',
        payment_id: event.checkout_id,
        payment_status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', commandeId)

    if (error) {
      throw error
    }

    logger.info('Payment cancelled', {
      commande_id: commandeId,
      checkout_id: event.checkout_id
    })

  } catch (error) {
    logger.error('Failed to update cancelled payment status', error as Error, {
      commande_id: commandeId,
      checkout_id: event.checkout_id
    })
    throw error
  }
}
