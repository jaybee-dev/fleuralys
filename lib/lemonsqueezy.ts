import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

const apiKey = process.env.LEMONSQUEEZY_API_KEY!

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error('LemonSqueezy Error:', error),
})

export interface CheckoutData {
  productId: string
  variantId?: string
  customPrice?: number
  customData?: {
    commande_id: string
    bouquet_id: string
    customer_name: string
    customer_email: string
  }
}

export function getCheckoutUrl(data: CheckoutData): string {
  const storeUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL!
  const params = new URLSearchParams({
    checkout: 'true',
    product: data.productId,
  })

  if (data.variantId) {
    params.append('variant', data.variantId)
  }

  if (data.customPrice) {
    params.append('price', data.customPrice.toString())
  }

  if (data.customData) {
    params.append('checkout[custom][commande_id]', data.customData.commande_id)
    params.append('checkout[custom][bouquet_id]', data.customData.bouquet_id)
    params.append('checkout[name]', data.customData.customer_name)
    params.append('checkout[email]', data.customData.customer_email)
  }

  return `${storeUrl}?${params.toString()}`
}

export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const crypto = await import('crypto')
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')
  return digest === signature
}
