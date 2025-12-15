'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Commande, StatutCommande } from '@/types/commande'
import type { User } from '@supabase/supabase-js'

interface DashboardClientProps {
  commandes: Commande[]
  user: User
}

export default function DashboardClient({ commandes: initialCommandes, user }: DashboardClientProps) {
  const [commandes, setCommandes] = useState(initialCommandes)
  const [filtreStatut, setFiltreStatut] = useState<StatutCommande | 'tous'>('tous')
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleStatutChange = async (commandeId: string, nouveauStatut: StatutCommande) => {
    const { error } = await supabase
      .from('commandes')
      .update({ statut: nouveauStatut })
      .eq('id', commandeId)

    if (!error) {
      setCommandes(
        commandes.map((c) =>
          c.id === commandeId ? { ...c, statut: nouveauStatut } : c
        )
      )
    }
  }

  const commandesFiltrees = filtreStatut === 'tous'
    ? commandes
    : commandes.filter((c) => c.statut === filtreStatut)

  const getStatutBadgeColor = (statut: StatutCommande) => {
    switch (statut) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmee':
        return 'bg-blue-100 text-blue-800'
      case 'prete':
        return 'bg-green-100 text-green-800'
      case 'retiree':
        return 'bg-gray-100 text-gray-800'
      case 'annulee':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatutLabel = (statut: StatutCommande) => {
    switch (statut) {
      case 'en_attente':
        return 'En attente'
      case 'confirmee':
        return 'Confirmée'
      case 'prete':
        return 'Prête'
      case 'retiree':
        return 'Retirée'
      case 'annulee':
        return 'Annulée'
      default:
        return statut
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-title font-bold text-neutral-900">
              Panneau d'administration
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Connecté en tant que {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-neutral-600">Total commandes</p>
            <p className="text-3xl font-bold text-neutral-900 mt-2">{commandes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-neutral-600">En attente</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {commandes.filter((c) => c.statut === 'en_attente').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-neutral-600">Confirmées</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {commandes.filter((c) => c.statut === 'confirmee').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-neutral-600">Prêtes</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {commandes.filter((c) => c.statut === 'prete').length}
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Filtres</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltreStatut('tous')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtreStatut === 'tous'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFiltreStatut('en_attente')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtreStatut === 'en_attente'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setFiltreStatut('confirmee')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtreStatut === 'confirmee'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Confirmées
            </button>
            <button
              onClick={() => setFiltreStatut('prete')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtreStatut === 'prete'
                  ? 'bg-green-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Prêtes
            </button>
            <button
              onClick={() => setFiltreStatut('retiree')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtreStatut === 'retiree'
                  ? 'bg-gray-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Retirées
            </button>
          </div>
        </div>

        {/* Liste des commandes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900">
              Commandes ({commandesFiltrees.length})
            </h2>
          </div>

          {commandesFiltrees.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-neutral-500">Aucune commande trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Bouquet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Retrait
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Prix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {commandesFiltrees.map((commande) => (
                    <tr key={commande.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {formatDateTime(commande.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{commande.nom}</div>
                        <div className="text-sm text-neutral-500">{commande.email}</div>
                        <div className="text-sm text-neutral-500">{commande.telephone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        {commande.bouquet_nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        <div>{formatDate(commande.date_retrait)}</div>
                        <div className="text-neutral-500">{commande.heure_retrait}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        {commande.prix.toFixed(2)} €
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatutBadgeColor(
                            commande.statut
                          )}`}
                        >
                          {getStatutLabel(commande.statut)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={commande.statut}
                          onChange={(e) =>
                            handleStatutChange(commande.id, e.target.value as StatutCommande)
                          }
                          className="border border-neutral-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="en_attente">En attente</option>
                          <option value="confirmee">Confirmée</option>
                          <option value="prete">Prête</option>
                          <option value="retiree">Retirée</option>
                          <option value="annulee">Annulée</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
