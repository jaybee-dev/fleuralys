'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function PaymentErrorContent() {
  const searchParams = useSearchParams()
  const commandeId = searchParams.get('commande_id')
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    payment_failed: 'Le paiement a échoué. Veuillez vérifier vos informations bancaires.',
    insufficient_funds: 'Fonds insuffisants sur votre compte.',
    card_declined: 'Votre carte a été refusée.',
    expired_card: 'Votre carte a expiré.',
    invalid_card: 'Les informations de carte sont invalides.',
  }

  const errorMessage = error ? errorMessages[error] || 'Une erreur est survenue lors du paiement.' : 'Une erreur est survenue lors du paiement.'

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          {/* Icône d'erreur */}
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Erreur de Paiement
          </h1>

          {/* Message d'erreur */}
          <p className="text-gray-600 mb-8">
            {errorMessage}
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

          {/* Conseils */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">Que faire ?</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Vérifiez les informations de votre carte bancaire</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Assurez-vous d'avoir suffisamment de fonds</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Essayez avec une autre carte</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Contactez votre banque si le problème persiste</span>
              </li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Link
              href="/pickup"
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Réessayer le paiement
            </Link>

            <Link
              href="/"
              className="block w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              Retour à l'accueil
            </Link>

            <a
              href="mailto:contact@fleurscomflorie.fr"
              className="block w-full text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Besoin d'aide ? Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PaymentErrorContent />
    </Suspense>
  )
}
