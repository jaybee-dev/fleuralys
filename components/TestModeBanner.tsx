'use client'

import { useEffect, useState } from 'react'

/**
 * Bannière affichée en haut de toutes les pages en mode test
 * Visible uniquement quand SUMUP_TEST_MODE=true
 */
export default function TestModeBanner() {
  const [isTestMode, setIsTestMode] = useState(false)

  useEffect(() => {
    // Vérifie si on est en mode test
    fetch('/api/config/test-mode')
      .then(res => res.json())
      .then(data => setIsTestMode(data.isTestMode))
      .catch(() => setIsTestMode(false))
  }, [])

  if (!isTestMode) return null

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-900 px-4 py-2 text-center font-semibold text-sm shadow-lg sticky top-0 z-50 animate-pulse">
      <div className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>🧪 MODE TEST ACTIVÉ - Aucun paiement réel ne sera effectué</span>
      </div>
    </div>
  )
}
