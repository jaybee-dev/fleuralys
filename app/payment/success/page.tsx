'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const commandeId = searchParams.get('commande_id')
  const checkoutId = searchParams.get('checkout_id')
  const [isTestMode, setIsTestMode] = useState(false)

  useEffect(() => {
    // Vérifie si on est en mode test en regardant si le checkout_id commence par "test_"
    if (checkoutId?.startsWith('test_')) {
      setIsTestMode(true)
    }
  }, [checkoutId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Badge TEST si applicable */}
        {isTestMode && (
          <div className="bg-yellow-400 text-center py-2 px-4">
            <p className="text-sm font-semibold text-yellow-900">
              🧪 MODE TEST - Aucun paiement réel effectué
            </p>
          </div>
        )}

        {/* Contenu principal */}
        <div className="p-8 text-center">
          {/* Icône de succès */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement Réussi !
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8">
            Votre commande a été confirmée et votre paiement a été accepté.
            Vous recevrez un email de confirmation sous peu.
          </p>

          {/* Détails */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-800 mb-3">Détails de votre commande</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro de commande:</span>
                <span className="font-mono font-semibold text-gray-900">{commandeId}</span>
              </div>
              {checkoutId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ID de transaction:</span>
                  <span className="font-mono text-xs text-gray-900">{checkoutId.substring(0, 20)}...</span>
                </div>
              )}
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">Prochaines étapes</h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Vous recevrez un email de confirmation à l'adresse fournie</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Nous préparerons votre bouquet avec soin</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Vous pourrez récupérer votre commande au magasin</span>
              </li>
            </ol>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Retour à l'accueil
            </Link>

            <Link
              href="/galerie"
              className="block w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              Voir nos autres bouquets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
