'use client'

import { useState } from 'react'
import { Clock, Save, AlertCircle } from 'lucide-react'
import type { HorairesConfig, PlageHoraire } from '@/config/horaires'

interface Props {
  horairesInitiaux: HorairesConfig
}

export default function HorairesClient({ horairesInitiaux }: Props) {
  const [horaires, setHoraires] = useState<HorairesConfig>(horairesInitiaux)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const

  const handleToggleOuvert = (jour: keyof HorairesConfig) => {
    setHoraires((prev) => ({
      ...prev,
      [jour]: {
        ouvert: !prev[jour].ouvert,
        plages: prev[jour].plages || [{ debut: '09:00', fin: '12:00' }],
      },
    }))
  }

  const handlePlageChange = (
    jour: keyof HorairesConfig,
    index: number,
    field: 'debut' | 'fin',
    value: string
  ) => {
    setHoraires((prev) => {
      const plages = [...(prev[jour].plages || [])]
      plages[index] = { ...plages[index], [field]: value }
      return {
        ...prev,
        [jour]: {
          ...prev[jour],
          plages,
        },
      }
    })
  }

  const handleAddPlage = (jour: keyof HorairesConfig) => {
    setHoraires((prev) => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        plages: [...(prev[jour].plages || []), { debut: '14:00', fin: '18:00' }],
      },
    }))
  }

  const handleRemovePlage = (jour: keyof HorairesConfig, index: number) => {
    setHoraires((prev) => {
      const plages = [...(prev[jour].plages || [])]
      plages.splice(index, 1)
      return {
        ...prev,
        [jour]: {
          ...prev[jour],
          plages,
        },
      }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/horaires', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ horaires }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde')
      }

      setMessage('Horaires mis à jour avec succès ! Les changements sont maintenant en ligne.')
      setMessageType('success')
    } catch (error) {
      console.error('Erreur:', error)
      setMessage('Erreur lors de la sauvegarde')
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
            Gestion des Horaires d'Ouverture
          </h1>
          <p className="text-lg text-neutral-600">
            Configurez les horaires d'ouverture hebdomadaires de la boutique
          </p>
        </div>

        {/* Message de feedback */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span>{message}</span>
          </div>
        )}

        {/* Formulaire des horaires */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {jours.map((jour) => (
              <div key={jour} className="border-b border-neutral-200 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-neutral-900 capitalize">{jour}</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={horaires[jour].ouvert}
                      onChange={() => handleToggleOuvert(jour)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-700">Ouvert</span>
                  </label>
                </div>

                {horaires[jour].ouvert && (
                  <div className="space-y-3">
                    {(horaires[jour].plages || []).map((plage, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-neutral-400" />
                        <input
                          type="time"
                          value={plage.debut}
                          onChange={(e) => handlePlageChange(jour, index, 'debut', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <span className="text-neutral-500">à</span>
                        <input
                          type="time"
                          value={plage.fin}
                          onChange={(e) => handlePlageChange(jour, index, 'fin', e.target.value)}
                          className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        {(horaires[jour].plages?.length || 0) > 1 && (
                          <button
                            onClick={() => handleRemovePlage(jour, index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddPlage(jour)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      + Ajouter une plage horaire
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Enregistrement...' : 'Enregistrer les horaires'}
            </button>
          </div>
        </div>

        {/* Avertissement */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Important</p>
              <p>
                Les modifications des horaires seront immédiatement visibles sur le site et
                affecteront les créneaux disponibles pour les commandes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
