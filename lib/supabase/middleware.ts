import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Évite d'écrire de la logique entre createServerClient et
  // supabase.auth.getUser(). Une simple erreur pourrait rendre vos clients
  // vulnérables à une attaque où un attaquant pourrait obtenir un accès
  // utilisateur.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protection des routes admin (sauf la page de login)
  if (request.nextUrl.pathname.startsWith('/admin') && !user && request.nextUrl.pathname !== '/admin/login') {
    // Pas de session, rediriger vers la page de connexion
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: Vous *devez* retourner la supabaseResponse comme ceci pour que
  // vos cookies d'authentification soient correctement définis.
  return supabaseResponse
}
