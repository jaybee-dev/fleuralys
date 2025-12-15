import { NextRequest, NextResponse } from 'next/server'
import { updateCommandeStatus } from '@/lib/supabase'
import { verifyWebhookSignature } from '@/lib/lemonsqueezy'

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-signature') || ''
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

    const isValid = await verifyWebhookSignature(rawBody, signature, secret)

    if (!isValid) {
      console.error('Signature webhook invalide')
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      )
    }

    const payload = JSON.parse(rawBody)
    const eventName = payload.meta?.event_name

    if (eventName === 'order_created') {
      const orderId = payload.data?.id
      const customData = payload.meta?.custom_data
      const status = payload.data?.attributes?.status

      if (customData?.commande_id && status === 'paid') {
        await updateCommandeStatus(
          customData.commande_id,
          'paid',
          orderId
        )

        console.log(`Commande ${customData.commande_id} marquée comme payée`)
      }
    }

    if (eventName === 'order_refunded') {
      const customData = payload.meta?.custom_data

      if (customData?.commande_id) {
        await updateCommandeStatus(
          customData.commande_id,
          'cancelled'
        )

        console.log(`Commande ${customData.commande_id} annulée (remboursée)`)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Webhook traité' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur webhook LemonSqueezy:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement du webhook' },
      { status: 500 }
    )
  }
}
