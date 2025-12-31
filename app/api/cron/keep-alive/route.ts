import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Faire une requête simple pour garder la DB active
    const { data, error } = await supabase
      .from('commandes')
      .select('id')
      .limit(1)

    if (error) throw error

    console.log('✅ Database keep-alive ping successful')

    return NextResponse.json({
      success: true,
      message: 'Database is alive',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Keep-alive error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to ping database'
    }, { status: 500 })
  }
}
