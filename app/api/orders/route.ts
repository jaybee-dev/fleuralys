import { NextRequest, NextResponse } from 'next/server'
import { createCommande } from '@/lib/supabase'
import { checkRateLimit, getClientIP } from '@/lib/ratelimit'
import { logger, logApiError } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)
  let body: any

  try {
    // Rate limiting: 5 commandes par heure par IP
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000 // 1 heure
    })

    // Ajouter les headers de rate limit
    const headers = {
      'X-RateLimit-Limit': rateLimitResult.limit.toString(),
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
    }

    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', {
        clientIP,
        endpoint: '/api/orders'
      })

      return NextResponse.json(
        {
          error: 'Trop de requêtes. Veuillez réessayer plus tard.',
          retryAfter: new Date(rateLimitResult.reset).toISOString()
        },
        {
          status: 429,
          headers
        }
      )
    }

    body = await request.json()
    const { nom, email, telephone, bouquet_id, date_heure, statut } = body

    // Validation des champs requis
    if (!nom || !email || !telephone || !bouquet_id || !date_heure) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400, headers }
      )
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400, headers }
      )
    }

    // Validation du format téléphone (basique)
    const phoneRegex = /^[\d\s+()-]{10,}$/
    if (!phoneRegex.test(telephone)) {
      return NextResponse.json(
        { error: 'Format de téléphone invalide' },
        { status: 400, headers }
      )
    }

    const commande = await createCommande({
      nom,
      email,
      telephone,
      bouquet_id,
      date_heure,
      statut: statut || 'pending',
    })

    return NextResponse.json(
      {
        success: true,
        commande,
        message: 'Commande créée avec succès'
      },
      { status: 201, headers }
    )
  } catch (error) {
    // Log sécurisé de l'erreur (sans données sensibles)
    logApiError('/api/orders', error, {
      clientIP,
      bouquet_id: body?.bouquet_id
    })

    // Message générique pour le client
    const errorMessage = error instanceof Error && error.message.includes('disponible')
      ? error.message
      : 'Une erreur est survenue lors de la création de la commande'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
