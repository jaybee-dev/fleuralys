import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { CreateCommandeInput } from '@/types/commande'

export async function POST(request: NextRequest) {
  try {
    const body: CreateCommandeInput = await request.json()

    // Validation basique
    if (!body.nom || !body.email || !body.telephone || !body.bouquet_id || !body.date_retrait || !body.heure_retrait) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insérer la commande dans Supabase
    const { data, error } = await supabase
      .from('commandes')
      .insert([
        {
          nom: body.nom,
          email: body.email,
          telephone: body.telephone,
          bouquet_id: body.bouquet_id,
          bouquet_nom: body.bouquet_nom,
          prix: body.prix,
          date_retrait: body.date_retrait,
          heure_retrait: body.heure_retrait,
          message_carte: body.message_carte,
          statut: 'en_attente',
          paiement_statut: 'en_attente',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la commande' },
        { status: 500 }
      )
    }

    return NextResponse.json({ commande: data }, { status: 201 })
  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier l'authentification pour la lecture
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Récupérer toutes les commandes
    const { data, error } = await supabase
      .from('commandes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des commandes' },
        { status: 500 }
      )
    }

    return NextResponse.json({ commandes: data }, { status: 200 })
  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
