'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { bouquets } from '@/data/bouquets'

const commandeSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Telephone invalide').regex(/^[0-9\s\-+()]+$/, 'Telephone invalide'),
  bouquet_id: z.string().min(1, 'Veuillez selectionner un bouquet'),
  date_retrait: z.string().min(1, 'Veuillez selectionner une date'),
  heure_retrait: z.string().min(1, 'Veuillez selectionner une heure'),
  message_carte: z.string().optional(),
})

type CommandeFormData = z.infer<typeof commandeSchema>

function PickupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [creneauxDisponibles, setCreneauxDisponibles] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [loadingCreneaux, setLoadingCreneaux] = useState(false)
  const [dateError, setDateError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CommandeFormData>({
    resolver: zodResolver(commandeSchema),
  })

  const dateRetrait = watch('date_retrait')

  useEffect(() => {
    const bouquetId = searchParams.get('bouquet')
    if (bouquetId) {
      setValue('bouquet_id', bouquetId)
    }
  }, [searchParams, setValue])

  // Charger les créneaux disponibles quand la date change
  useEffect(() => {
    if (dateRetrait && dateRetrait !== selectedDate) {
      setSelectedDate(dateRetrait)
      setLoadingCreneaux(true)
      setDateError('')
      setValue('heure_retrait', '') // Réinitialiser l'heure

      fetch(`/api/horaires/creneaux?date=${dateRetrait}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.creneaux && data.creneaux.length > 0) {
            setCreneauxDisponibles(data.creneaux)
            setDateError('')
          } else {
            setCreneauxDisponibles([])
            setDateError('La boutique est fermée ce jour-là. Veuillez choisir une autre date.')
          }
        })
        .catch((err) => {
          console.error('Erreur chargement créneaux:', err)
          setCreneauxDisponibles([])
          setDateError('Erreur lors de la vérification des horaires')
        })
        .finally(() => {
          setLoadingCreneaux(false)
        })
    }
  }, [dateRetrait, selectedDate, setValue])

  const onSubmit = async (data: CommandeFormData) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Valider la date et l'heure de retrait
      const validationResponse = await fetch('/api/horaires/valider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date_retrait: data.date_retrait,
          heure_retrait: data.heure_retrait,
        }),
      })

      const validation = await validationResponse.json()

      if (!validation.valide) {
        setSubmitMessage(validation.erreur || 'Horaire invalide')
        setIsSubmitting(false)
        return
      }

      const selectedBouquet = bouquets.find((b) => b.id === data.bouquet_id)

      if (!selectedBouquet) {
        throw new Error('Bouquet non trouvé')
      }

      const response = await fetch('/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          bouquet_id: data.bouquet_id,
          bouquet_nom: selectedBouquet.nom,
          prix: selectedBouquet.prix,
          date_retrait: data.date_retrait,
          heure_retrait: data.heure_retrait,
          message_carte: data.message_carte,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la creation de la commande')
      }

      const result = await response.json()

      // Créer une session de paiement Sumup
      if (selectedBouquet) {
        const paymentResponse = await fetch('/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            commande_id: result.commande.id,
            bouquet_id: data.bouquet_id,
            amount: selectedBouquet.prix,
            customer_email: data.email,
            customer_name: data.nom,
            description: `Bouquet ${selectedBouquet.nom}`,
          }),
        })

        if (paymentResponse.ok) {
          const { paymentUrl } = await paymentResponse.json()
          window.location.href = paymentUrl
        } else {
          setSubmitMessage('Commande creee avec succes! Nous vous contacterons pour le paiement.')
        }
      } else {
        setSubmitMessage('Commande creee avec succes! Nous vous contacterons pour le paiement.')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setSubmitMessage('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const minDate = new Date()
  minDate.setHours(minDate.getHours() + 24)
  const minDateString = minDate.toISOString().split('T')[0]

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
            Commander un Bouquet
          </h1>
          <p className="text-lg text-neutral-600">
            Remplissez le formulaire ci-dessous pour commander votre bouquet a recuperer en boutique
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-neutral-700 mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nom"
                {...register('nom')}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Jean Dupont"
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-500">{errors.nom.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="jean.dupont@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-neutral-700 mb-2">
                Telephone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telephone"
                {...register('telephone')}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="06 12 34 56 78"
              />
              {errors.telephone && (
                <p className="mt-1 text-sm text-red-500">{errors.telephone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="bouquet_id" className="block text-sm font-medium text-neutral-700 mb-2">
                Bouquet <span className="text-red-500">*</span>
              </label>
              <select
                id="bouquet_id"
                {...register('bouquet_id')}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Selectionnez un bouquet</option>
                {bouquets
                  .filter((b) => b.disponible)
                  .map((bouquet) => (
                    <option key={bouquet.id} value={bouquet.id}>
                      {bouquet.nom} - {bouquet.prix.toFixed(2)} EUR
                    </option>
                  ))}
              </select>
              {errors.bouquet_id && (
                <p className="mt-1 text-sm text-red-500">{errors.bouquet_id.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="date_retrait" className="block text-sm font-medium text-neutral-700 mb-2">
                Date de recuperation <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date_retrait"
                {...register('date_retrait')}
                min={minDateString}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.date_retrait && (
                <p className="mt-1 text-sm text-red-500">{errors.date_retrait.message}</p>
              )}
              {dateError && (
                <p className="mt-1 text-sm text-red-500">{dateError}</p>
              )}
              <p className="mt-1 text-sm text-neutral-500">
                Les commandes doivent etre passees au moins 24h a l'avance
              </p>
            </div>

            <div>
              <label htmlFor="heure_retrait" className="block text-sm font-medium text-neutral-700 mb-2">
                Heure de recuperation <span className="text-red-500">*</span>
              </label>
              <select
                id="heure_retrait"
                {...register('heure_retrait')}
                disabled={!dateRetrait || loadingCreneaux || creneauxDisponibles.length === 0}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!dateRetrait
                    ? 'Selectionnez d\'abord une date'
                    : loadingCreneaux
                    ? 'Chargement des horaires...'
                    : creneauxDisponibles.length === 0
                    ? 'Aucun creneau disponible'
                    : 'Selectionnez une heure'}
                </option>
                {creneauxDisponibles.map((creneau) => (
                  <option key={creneau} value={creneau}>
                    {creneau}
                  </option>
                ))}
              </select>
              {errors.heure_retrait && (
                <p className="mt-1 text-sm text-red-500">{errors.heure_retrait.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message_carte" className="block text-sm font-medium text-neutral-700 mb-2">
                Message pour la carte (optionnel)
              </label>
              <textarea
                id="message_carte"
                {...register('message_carte')}
                rows={3}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Votre message personnalise pour accompagner le bouquet..."
              />
              {errors.message_carte && (
                <p className="mt-1 text-sm text-red-500">{errors.message_carte.message}</p>
              )}
            </div>
          </div>

          {submitMessage && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                submitMessage.includes('succes')
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {submitMessage}
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Traitement en cours...' : 'Commander et payer en ligne'}
            </button>
          </div>

          <p className="mt-4 text-sm text-neutral-500 text-center">
            En cliquant sur "Commander", vous serez redirige vers notre page de paiement securisee
          </p>
        </form>
      </div>
    </div>
  )
}

export default function PickupPage() {
  return (
    <Suspense fallback={<div className="container-custom py-16 text-center">Chargement...</div>}>
      <PickupForm />
    </Suspense>
  )
}
