'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { bouquets } from '@/data/bouquets'
import { getCheckoutUrl } from '@/lib/lemonsqueezy'

const commandeSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Telephone invalide').regex(/^[0-9\s\-+()]+$/, 'Telephone invalide'),
  bouquet_id: z.string().min(1, 'Veuillez selectionner un bouquet'),
  date_heure: z.string().min(1, 'Veuillez selectionner une date et heure'),
})

type CommandeFormData = z.infer<typeof commandeSchema>

function PickupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CommandeFormData>({
    resolver: zodResolver(commandeSchema),
  })

  useEffect(() => {
    const bouquetId = searchParams.get('bouquet')
    if (bouquetId) {
      setValue('bouquet_id', bouquetId)
    }
  }, [searchParams, setValue])

  const onSubmit = async (data: CommandeFormData) => {
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          statut: 'pending',
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la creation de la commande')
      }

      const result = await response.json()
      const selectedBouquet = bouquets.find((b) => b.id === data.bouquet_id)

      if (selectedBouquet?.lemonsqueezyProductId) {
        const checkoutUrl = getCheckoutUrl({
          productId: selectedBouquet.lemonsqueezyProductId,
          customData: {
            commande_id: result.commande.id,
            bouquet_id: data.bouquet_id,
            customer_name: data.nom,
            customer_email: data.email,
          },
        })

        window.location.href = checkoutUrl
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

  const minDateTime = new Date()
  minDateTime.setHours(minDateTime.getHours() + 24)
  const minDateTimeString = minDateTime.toISOString().slice(0, 16)

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
              <label htmlFor="date_heure" className="block text-sm font-medium text-neutral-700 mb-2">
                Date et heure de recuperation <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="date_heure"
                {...register('date_heure')}
                min={minDateTimeString}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.date_heure && (
                <p className="mt-1 text-sm text-red-500">{errors.date_heure.message}</p>
              )}
              <p className="mt-1 text-sm text-neutral-500">
                Les commandes doivent etre passees au moins 24h a l'avance
              </p>
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
