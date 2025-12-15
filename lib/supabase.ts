import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Commande {
  id?: string
  nom: string
  email: string
  telephone: string
  bouquet_id: string
  date_heure: string
  statut: 'pending' | 'paid' | 'ready' | 'completed' | 'cancelled'
  created_at?: string
  lemonsqueezy_order_id?: string
}

export async function createCommande(commande: Omit<Commande, 'id' | 'created_at'>) {
  // Vérifier la disponibilité du bouquet
  const { data: bouquet, error: bouquetError } = await supabase
    .from('bouquets')
    .select('stock, disponible')
    .eq('id', commande.bouquet_id)
    .single()

  if (bouquetError) throw new Error('Bouquet introuvable')
  if (!bouquet.disponible || bouquet.stock <= 0) {
    throw new Error('Ce bouquet n\'est plus disponible')
  }

  // Créer la commande
  const { data, error } = await supabase
    .from('commandes')
    .insert([commande])
    .select()
    .single()

  if (error) throw error

  // Décrémenter le stock du bouquet
  const newStock = bouquet.stock - 1
  const { error: updateError } = await supabase
    .from('bouquets')
    .update({
      stock: newStock,
      disponible: newStock > 0
    })
    .eq('id', commande.bouquet_id)

  if (updateError) {
    console.error('Erreur lors de la mise à jour du stock:', updateError)
    // Ne pas échouer la commande si la mise à jour du stock échoue
  }

  return data
}

export async function updateCommandeStatus(
  id: string,
  statut: Commande['statut'],
  lemonsqueezyOrderId?: string
) {
  const updateData: Partial<Commande> = { statut }
  if (lemonsqueezyOrderId) {
    updateData.lemonsqueezy_order_id = lemonsqueezyOrderId
  }

  const { data, error } = await supabase
    .from('commandes')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCommande(id: string) {
  const { data, error } = await supabase
    .from('commandes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
