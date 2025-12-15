import type { Metadata } from 'next'
import './globals.css'
import { localBusinessSchema, websiteSchema } from './schema'

export const metadata: Metadata = {
  title: "Fleurs com'Florie - Fleuriste à Villeneuve-Lès-Maguelone",
  description: "Fleuriste à Villeneuve-Lès-Maguelone (34). Compositions florales artisanales, bouquets sur mesure, livraison et retrait en boutique. Commande en ligne avec paiement sécurisé.",
  keywords: "fleuriste, Villeneuve-Lès-Maguelone, Hérault, bouquets, compositions florales, fleurs fraîches, livraison fleurs, Montpellier",
  authors: [{ name: "Fleurs com'Florie" }],
  creator: "Fleurs com'Florie",
  publisher: "Fleurs com'Florie",
  metadataBase: new URL('https://fleurs-comflorie.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fleurs com'Florie - Fleuriste Villeneuve-Lès-Maguelone",
    description: "Compositions florales artisanales à Villeneuve-Lès-Maguelone. Bouquets sur mesure, commande et paiement en ligne.",
    url: 'https://fleurs-comflorie.fr',
    siteName: "Fleurs com'Florie",
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fleurs com'Florie - Fleuriste Villeneuve-Lès-Maguelone",
    description: "Compositions florales artisanales à Villeneuve-Lès-Maguelone",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#fdf4f5" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
