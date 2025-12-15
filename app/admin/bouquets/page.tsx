import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BouquetsClient from './BouquetsClient'

export default async function AdminBouquetsPage() {
  const supabase = await createClient()

  // Vérifier l'authentification
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Récupérer les bouquets depuis Supabase
  const { data: bouquets, error } = await supabase
    .from('bouquets')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Erreur lors de la récupération des bouquets:', error)
  }

  return (
    <div>
      {/* Navbar admin */}
      <nav className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              >
                Commandes
              </Link>
              <Link
                href="/admin/bouquets"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-600 text-sm font-medium text-neutral-900"
              >
                Bouquets
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <BouquetsClient bouquets={bouquets || []} user={user} />
    </div>
  )
}
