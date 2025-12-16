import { createClient } from '@supabase/supabase-js'

/**
 * Client Supabase Admin avec service_role_key
 * Contourne les RLS (Row Level Security) - À utiliser uniquement côté serveur
 *
 * ⚠️ ATTENTION: Ne jamais exposer ce client côté client !
 * Le service_role_key a tous les droits sur la base de données.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
