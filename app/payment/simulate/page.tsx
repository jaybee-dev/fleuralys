'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import { updateSimulatedCheckoutStatus } from '@/lib/sumup-simulator'

function PaymentSimulateContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  const checkoutId = searchParams.get('checkout_id')
  const amount = parseFloat(searchParams.get('amount') || '0')
  const reference = searchParams.get('reference')

  const handlePayment = async (status: 'PAID' | 'FAILED' | 'CANCELLED') => {
    if (!checkoutId) return

    setProcessing(true)

    // Simule un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Met à jour le statut du checkout
    updateSimulatedCheckoutStatus(checkoutId, status)

    // Si paiement réussi, appeler le webhook pour mettre à jour la commande et envoyer l'email
    if (status === 'PAID' && reference) {
      try {
        await fetch('/api/webhooks/payment-success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            commande_id: reference,
            checkout_id: checkoutId,
          }),
        })
      } catch (error) {
        console.error('Erreur webhook payment-success:', error)
        // Continue quand même vers la page de succès
      }
    }

    // Redirige vers la page de retour
    if (status === 'PAID') {
      router.push(`/payment/success?commande_id=${reference}&checkout_id=${checkoutId}`)
    } else if (status === 'CANCELLED') {
      router.push(`/payment/cancel?commande_id=${reference}`)
    } else {
      router.push(`/payment/error?commande_id=${reference}&error=payment_failed`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header avec badge TEST */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Mode Test - Simulateur de Paiement</h1>
              <p className="text-sm opacity-90 mt-1">Aucun argent réel ne sera débité</p>
            </div>
            <div className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold text-sm">
              🧪 TEST MODE
            </div>
          </div>
        </div>

        {/* Corps du simulateur */}
        <div className="p-8">
          {/* Informations de paiement */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Détails de la Transaction</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Montant:</span>
                <span className="font-bold text-gray-900 text-xl">{amount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Référence:</span>
                <span className="font-mono text-sm text-gray-900">{reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Checkout ID:</span>
                <span className="font-mono text-sm text-gray-900">{checkoutId?.substring(0, 20)}...</span>
              </div>
            </div>
          </div>

          {/* Cartes de test */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Cartes de Test Disponibles
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between items-center">
                <span className="font-mono">4242 4242 4242 4242</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Succès</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono">4000 0000 0000 0002</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Refusée</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono">4000 0000 0000 9995</span>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Fonds insuffisants</span>
              </div>
            </div>
          </div>

          {/* Boutons de simulation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-3">Simuler le résultat du paiement:</h3>

            <button
              onClick={() => handlePayment('PAID')}
              disabled={processing}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </span>
              ) : (
                '✓ Paiement Réussi'
              )}
            </button>

            <button
              onClick={() => handlePayment('FAILED')}
              disabled={processing}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              ✗ Paiement Échoué
            </button>

            <button
              onClick={() => handlePayment('CANCELLED')}
              disabled={processing}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              ← Annuler le Paiement
            </button>
          </div>

          {/* Note */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Ceci est un simulateur pour le mode test.
              En production, le client sera redirigé vers la vraie page de paiement Sumup.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSimulatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PaymentSimulateContent />
    </Suspense>
  )
}
