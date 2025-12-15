import { NextRequest, NextResponse } from 'next/server'
import { createPaymentUrl } from '@/lib/sumup'
import { logger, logApiError } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { commande_id, bouquet_id, amount, customer_email, customer_name, description } = body

    // Validation des champs requis
    if (!commande_id || !amount || !customer_email || !customer_name) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    logger.info('Creating Sumup payment', {
      commande_id,
      bouquet_id,
      amount
    })

    // Créer l'URL de paiement Sumup
    const paymentUrl = await createPaymentUrl(
      commande_id,
      bouquet_id,
      amount,
      customer_email,
      customer_name,
      description
    )

    logger.info('Sumup payment URL created', {
      commande_id
    })

    return NextResponse.json({ paymentUrl }, { status: 200 })

  } catch (error) {
    logApiError('/api/create-payment', error)

    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    )
  }
}
