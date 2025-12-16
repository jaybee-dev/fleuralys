/**
 * Intégration Sumup pour les paiements
 * Commission: 1,39% par transaction
 * Documentation: https://developer.sumup.com/
 */

import {
  simulateCreateCheckout,
  simulateGetCheckout,
  simulateVerifyWebhook
} from './sumup-simulator'

/**
 * Vérifie si le mode test est activé
 */
function isTestMode(): boolean {
  return process.env.SUMUP_TEST_MODE === 'true'
}

export interface SumupCheckoutData {
  amount: number // Montant en euros
  currency?: string // Devise (EUR par défaut)
  checkout_reference: string // Référence unique (commande_id)
  description: string
  merchant_code?: string
  return_url?: string
  customer?: {
    email: string
    name: string
    phone?: string
  }
}

export interface SumupCheckoutResponse {
  id: string
  checkout_reference: string
  amount: number
  currency: string
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
  date: string
  merchant_code: string
  description: string
  return_url: string
  checkout_url: string // URL pour rediriger le client
}

/**
 * Crée une session de paiement Sumup
 */
export async function createSumupCheckout(
  data: SumupCheckoutData
): Promise<SumupCheckoutResponse> {
  // Mode test : utilise le simulateur
  if (isTestMode()) {
    return simulateCreateCheckout(data)
  }

  // Mode production : utilise l'API réelle
  const apiKey = process.env.SUMUP_API_KEY

  if (!apiKey) {
    throw new Error('SUMUP_API_KEY is not configured')
  }

  const checkoutData = {
    checkout_reference: data.checkout_reference,
    amount: data.amount,
    currency: data.currency || 'EUR',
    merchant_code: data.merchant_code || process.env.SUMUP_MERCHANT_CODE,
    description: data.description,
    return_url: data.return_url || `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    ...(data.customer && {
      customer: data.customer
    })
  }

  const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Sumup API Error: ${error.message || response.statusText}`)
  }

  const checkout: SumupCheckoutResponse = await response.json()

  return checkout
}

/**
 * Récupère les détails d'un paiement Sumup
 */
export async function getSumupCheckout(
  checkoutId: string
): Promise<SumupCheckoutResponse> {
  // Mode test : utilise le simulateur
  if (isTestMode()) {
    return simulateGetCheckout(checkoutId)
  }

  // Mode production : utilise l'API réelle
  const apiKey = process.env.SUMUP_API_KEY

  if (!apiKey) {
    throw new Error('SUMUP_API_KEY is not configured')
  }

  const response = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Sumup API Error: ${error.message || response.statusText}`)
  }

  return await response.json()
}

/**
 * Vérifie la signature d'un webhook Sumup
 */
export async function verifySumupWebhook(
  payload: string,
  signature: string
): Promise<boolean> {
  // Mode test : utilise le simulateur (accepte toujours)
  if (isTestMode()) {
    return simulateVerifyWebhook(payload, signature)
  }

  // Mode production : vérifie vraiment la signature
  const webhookSecret = process.env.SUMUP_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('SUMUP_WEBHOOK_SECRET is not configured')
  }

  const crypto = await import('crypto')
  const hmac = crypto.createHmac('sha256', webhookSecret)
  const computedSignature = hmac.update(payload).digest('hex')

  return computedSignature === signature
}

/**
 * Génère l'URL de paiement pour une commande
 */
export async function createPaymentUrl(
  commandeId: string,
  bouquetId: string,
  amount: number,
  customerEmail: string,
  customerName: string,
  description: string
): Promise<string> {
  const checkout = await createSumupCheckout({
    amount,
    checkout_reference: commandeId,
    description,
    customer: {
      email: customerEmail,
      name: customerName,
    },
    return_url: `${process.env.NEXT_PUBLIC_URL}/payment/success?commande_id=${commandeId}`,
  })

  return checkout.checkout_url
}

/**
 * Types pour les webhooks Sumup
 */
export interface SumupWebhookEvent {
  event_type: 'checkout.paid' | 'checkout.failed' | 'checkout.cancelled'
  event_id: string
  event_timestamp: string
  checkout_id: string
  checkout_reference: string
  amount: number
  currency: string
  status: 'PAID' | 'FAILED' | 'CANCELLED'
  merchant_code: string
}
