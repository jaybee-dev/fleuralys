/**
 * Simulateur de paiement Sumup pour les tests
 * Permet de tester le flux de paiement sans appeler l'API réelle
 */

import type { SumupCheckoutData, SumupCheckoutResponse } from './sumup'

/**
 * Simule la création d'une session de paiement Sumup
 */
export async function simulateCreateCheckout(
  data: SumupCheckoutData
): Promise<SumupCheckoutResponse> {
  // Simule une latence réseau (100-300ms)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))

  const checkoutId = `test_checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const checkout: SumupCheckoutResponse = {
    id: checkoutId,
    checkout_reference: data.checkout_reference,
    amount: data.amount,
    currency: data.currency || 'EUR',
    status: 'PENDING',
    date: new Date().toISOString(),
    merchant_code: 'TEST_MERCHANT',
    description: data.description,
    return_url: data.return_url || `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    checkout_url: `${process.env.NEXT_PUBLIC_URL}/payment/simulate?checkout_id=${checkoutId}&amount=${data.amount}&reference=${data.checkout_reference}`
  }

  // Stocke le checkout en mémoire pour la simulation
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`sumup_test_${checkoutId}`, JSON.stringify(checkout))
  }

  console.log('🧪 [SUMUP TEST MODE] Checkout créé:', checkout)

  return checkout
}

/**
 * Simule la récupération d'un checkout
 */
export async function simulateGetCheckout(
  checkoutId: string
): Promise<SumupCheckoutResponse> {
  // Simule une latence réseau
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))

  // Récupère depuis le sessionStorage si disponible
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(`sumup_test_${checkoutId}`)
    if (stored) {
      const checkout = JSON.parse(stored)
      console.log('🧪 [SUMUP TEST MODE] Checkout récupéré:', checkout)
      return checkout
    }
  }

  // Sinon retourne un checkout par défaut
  const checkout: SumupCheckoutResponse = {
    id: checkoutId,
    checkout_reference: `order_${Date.now()}`,
    amount: 50.00,
    currency: 'EUR',
    status: 'PENDING',
    date: new Date().toISOString(),
    merchant_code: 'TEST_MERCHANT',
    description: 'Test payment',
    return_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    checkout_url: `${process.env.NEXT_PUBLIC_URL}/payment/simulate?checkout_id=${checkoutId}`
  }

  console.log('🧪 [SUMUP TEST MODE] Checkout récupéré (défaut):', checkout)

  return checkout
}

/**
 * Simule la vérification d'un webhook
 */
export async function simulateVerifyWebhook(
  payload: string,
  signature: string
): Promise<boolean> {
  // En mode test, on accepte toujours les webhooks
  console.log('🧪 [SUMUP TEST MODE] Webhook vérifié (toujours valide)')
  return true
}

/**
 * Met à jour le statut d'un checkout simulé
 */
export function updateSimulatedCheckoutStatus(
  checkoutId: string,
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'
): void {
  if (typeof window === 'undefined') return

  const stored = sessionStorage.getItem(`sumup_test_${checkoutId}`)
  if (stored) {
    const checkout = JSON.parse(stored)
    checkout.status = status
    sessionStorage.setItem(`sumup_test_${checkoutId}`, JSON.stringify(checkout))
    console.log(`🧪 [SUMUP TEST MODE] Statut mis à jour: ${status}`)
  }
}

/**
 * Cartes de test disponibles (pour documentation)
 */
export const TEST_CARDS = {
  success: {
    number: '4242 4242 4242 4242',
    expiry: '12/34',
    cvv: '123',
    description: 'Paiement réussi'
  },
  declined: {
    number: '4000 0000 0000 0002',
    expiry: '12/34',
    cvv: '123',
    description: 'Carte refusée'
  },
  insufficient_funds: {
    number: '4000 0000 0000 9995',
    expiry: '12/34',
    cvv: '123',
    description: 'Fonds insuffisants'
  }
}
