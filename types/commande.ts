export type StatutCommande = 'en_attente' | 'confirmee' | 'prete' | 'retiree' | 'annulee'
export type StatutPaiement = 'en_attente' | 'paye' | 'rembourse'

export interface Commande {
  id: string
  created_at: string
  updated_at: string

  // Informations client
  nom: string
  email: string
  telephone: string

  // Informations commande
  bouquet_id: string
  bouquet_nom: string
  prix: number

  // Informations retrait
  date_retrait: string
  heure_retrait: string
  message_carte?: string

  // Statut et paiement
  statut: StatutCommande
  paiement_statut: StatutPaiement
  paiement_id?: string
  montant_paye?: number
}

export interface CreateCommandeInput {
  nom: string
  email: string
  telephone: string
  bouquet_id: string
  bouquet_nom: string
  prix: number
  date_retrait: string
  heure_retrait: string
  message_carte?: string
}
