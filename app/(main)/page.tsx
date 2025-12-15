import { createClient } from '@/lib/supabase/server'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const supabase = await createClient()

  // Récupérer les bouquets depuis Supabase
  const { data: bouquets, error } = await supabase
    .from('bouquets')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Erreur lors de la récupération des bouquets:', error)
  }

  return <HomeClient bouquets={bouquets || []} />
}
