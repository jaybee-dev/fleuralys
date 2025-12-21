'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function PaymentCancelContent() {
  const searchParams = useSearchParams()
  const commandeId = searchParams.get('commande_id')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          {/* Icône d'annulation */}
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement Annulé
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8">
            Vous avez annulé le paiement. Votre commande n'a pas été traitée.
          </p>

          {/* Détails */}
          {commandeId && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Référence de commande:</span>
                <span className="font-mono font-semibold text-gray-900">{commandeId}</span>
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Link
              href="/pickup"
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Réessayer
            </Link>

            <Link
              href="/"
              className="block w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PaymentCancelContent />
    </Suspense>
  )
}
