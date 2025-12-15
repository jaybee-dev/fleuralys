import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Vérifier l'authentification
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Récupérer les commandes
  const { data: commandes, error } = await supabase
    .from('commandes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erreur lors de la récupération des commandes:', error)
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
                className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-600 text-sm font-medium text-neutral-900"
              >
                Commandes
              </Link>
              <Link
                href="/admin/bouquets"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              >
                Bouquets
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <DashboardClient commandes={commandes || []} user={user} />
    </div>
  )
}
