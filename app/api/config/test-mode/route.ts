import { NextResponse } from 'next/server'

/**
 * API pour vérifier si le mode test est activé
 * Permet au frontend de savoir si SUMUP_TEST_MODE=true
 */
export async function GET() {
  const isTestMode = process.env.SUMUP_TEST_MODE === 'true'

  return NextResponse.json({
    isTestMode,
  })
}
