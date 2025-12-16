import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { HORAIRES_OUVERTURE, type HorairesConfig } from '@/config/horaires'
import HorairesClient from './HorairesClient'

export default async function AdminHorairesPage() {
  const supabase = await createClient()

  // Vérifier l'authentification
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Charger les horaires depuis la base de données
  const supabaseAdmin = createAdminClient()
  const { data: horairesDB } = await supabaseAdmin
    .from('horaires_ouverture')
    .select('*')
    .order('jour', { ascending: true })

  // Convertir en format HorairesConfig
  let horairesInitiaux: HorairesConfig = { ...HORAIRES_OUVERTURE }

  if (horairesDB && horairesDB.length > 0) {
    for (const row of horairesDB) {
      horairesInitiaux = {
        ...horairesInitiaux,
        [row.jour]: {
          ouvert: row.ouvert,
          plages: row.plages || undefined,
        }
      }
    }
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
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              >
                Bouquets
              </Link>
              <Link
                href="/admin/horaires"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-primary-600 text-sm font-medium text-neutral-900"
              >
                Horaires
              </Link>
              <Link
                href="/admin/fermetures"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
              >
                Fermetures
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <HorairesClient horairesInitiaux={horairesInitiaux} />
    </div>
  )
}
