'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Calendar, AlertCircle } from 'lucide-react'
import type { FermetureExceptionnelle } from '@/lib/horaires'

export default function FermeturesClient() {
  const [fermetures, setFermetures] = useState<FermetureExceptionnelle[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const [newDate, setNewDate] = useState('')
  const [newRaison, setNewRaison] = useState('')

  useEffect(() => {
    loadFermetures()
  }, [])

  const loadFermetures = async () => {
    try {
      const response = await fetch('/api/admin/fermetures')
      const data = await response.json()
      setFermetures(data.fermetures || [])
    } catch (error) {
      console.error('Erreur chargement fermetures:', error)
      showMessage('Erreur lors du chargement', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newDate || !newRaison) {
      showMessage('Veuillez remplir tous les champs', 'error')
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/admin/fermetures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: newDate,
          raison: newRaison,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        showMessage(data.error || "Erreur lors de l'ajout", 'error')
        return
      }

      showMessage('Fermeture ajoutée avec succès', 'success')
      setNewDate('')
      setNewRaison('')
      loadFermetures()
    } catch (error) {
      console.error('Erreur:', error)
      showMessage("Erreur lors de l'ajout", 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette fermeture ?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/fermetures?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        showMessage('Erreur lors de la suppression', 'error')
        return
      }

      showMessage('Fermeture supprimée avec succès', 'success')
      loadFermetures()
    } catch (error) {
      console.error('Erreur:', error)
      showMessage('Erreur lors de la suppression', 'error')
    }
  }

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const minDate = new Date().toISOString().split('T')[0]

  if (loading) {
    return (
      <div className="container-custom py-16">
        <p className="text-center text-neutral-500">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
            Gestion des Fermetures Exceptionnelles
          </h1>
          <p className="text-lg text-neutral-600">
            Gérez les jours de fermeture exceptionnelle (vacances, jours fériés spéciaux, etc.)
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

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-serif font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Ajouter une fermeture
          </h2>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={minDate}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="raison" className="block text-sm font-medium text-neutral-700 mb-2">
                  Raison <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="raison"
                  value={newRaison}
                  onChange={(e) => setNewRaison(e.target.value)}
                  placeholder="Ex: Congés d'été, Jour férié spécial..."
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Ajout en cours...' : 'Ajouter la fermeture'}
            </button>
          </form>
        </div>

        {/* Liste des fermetures */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-serif font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Fermetures planifiées ({fermetures.length})
          </h2>

          {fermetures.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">
              Aucune fermeture exceptionnelle planifiée
            </p>
          ) : (
            <div className="space-y-3">
              {fermetures.map((fermeture) => (
                <div
                  key={fermeture.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{formatDate(fermeture.date)}</p>
                    <p className="text-sm text-neutral-600 mt-1">{fermeture.raison}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(fermeture.id!)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avertissement */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Important</p>
              <p>
                Les dates ajoutées ici seront automatiquement indisponibles pour les commandes. Les
                clients ne pourront pas sélectionner ces dates lors de la commande.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
