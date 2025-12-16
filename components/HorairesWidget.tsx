'use client'

import { useEffect, useState } from 'react'
import { Clock, AlertCircle } from 'lucide-react'

interface HoraireSemaine {
  jour: string
  ouvert: boolean
  horaires: string | null
}

interface FermetureExceptionnelle {
  id?: string
  date: string
  raison: string
}

export default function HorairesWidget() {
  const [horaires, setHoraires] = useState<HoraireSemaine[]>([])
  const [fermetures, setFermetures] = useState<FermetureExceptionnelle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/horaires').then((res) => res.json()),
      fetch('/api/admin/fermetures').then((res) => res.json()),
    ])
      .then(([horairesData, fermeturesData]) => {
        setHoraires(horairesData.horaires || [])

        // Filtrer pour n'afficher que les fermetures futures
        const aujourdhui = new Date()
        aujourdhui.setHours(0, 0, 0, 0)

        const fermeturesFutures = (fermeturesData.fermetures || [])
          .filter((f: FermetureExceptionnelle) => {
            const dateFermeture = new Date(f.date + 'T00:00:00')
            return dateFermeture >= aujourdhui
          })
          .slice(0, 5) // Limiter à 5 prochaines fermetures

        setFermetures(fermeturesFutures)
      })
      .catch((err) => {
        console.error('Erreur chargement horaires:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-serif font-semibold text-neutral-900">
            Horaires d'ouverture
          </h3>
        </div>
        <p className="text-neutral-500">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-serif font-semibold text-neutral-900">
          Horaires d'ouverture
        </h3>
      </div>

      <div className="space-y-3">
        {horaires.map((horaire) => (
          <div key={horaire.jour} className="flex justify-between items-start">
            <span className="font-medium text-neutral-700 min-w-[100px]">
              {horaire.jour}
            </span>
            <span className="text-neutral-600 text-right">
              {horaire.ouvert ? (
                horaire.horaires
              ) : (
                <span className="text-red-600">Fermé</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-neutral-200">
        <p className="text-sm text-neutral-500">
          Fermé les jours fériés et pendant les congés exceptionnels
        </p>
        <p className="text-sm text-neutral-500 mt-1">
          Commandes à passer 24h à l'avance minimum
        </p>
      </div>

      {/* Fermetures exceptionnelles à venir */}
      {fermetures.length > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h4 className="font-medium text-neutral-900">Fermetures exceptionnelles</h4>
          </div>
          <div className="space-y-2">
            {fermetures.map((fermeture) => (
              <div key={fermeture.id} className="text-sm">
                <p className="font-medium text-neutral-700">
                  {new Date(fermeture.date + 'T00:00:00').toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
                <p className="text-neutral-500">{fermeture.raison}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
