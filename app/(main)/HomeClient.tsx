'use client'

import { useRouter } from 'next/navigation'
import BouquetCard from '@/components/BouquetCard'
import HorairesWidget from '@/components/HorairesWidget'
import type { Bouquet } from '@/data/bouquets'

interface HomeClientProps {
  bouquets: Bouquet[]
}

export default function HomeClient({ bouquets }: HomeClientProps) {
  const router = useRouter()

  const handleOrder = (bouquetId: string) => {
    router.push(`/pickup?bouquet=${bouquetId}`)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-primary-50 via-primary-100 to-white overflow-hidden z-0">
        {/* Courbes organiques en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vague supérieure - plus visible et animée */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1440 600" preserveAspectRatio="none" style={{ animation: 'wave-gentle 15s ease-in-out infinite' }}>
            <path
              d="M0,200 C320,280 420,120 720,200 C1020,280 1120,120 1440,200 L1440,0 L0,0 Z"
              fill="url(#gradient1)"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f9a8d4', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#fbcfe8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f9a8d4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>

          {/* Vague centrale - animée dans l'autre sens */}
          <svg className="absolute top-1/4 left-0 w-full h-full opacity-12" viewBox="0 0 1440 600" preserveAspectRatio="none" style={{ animation: 'wave-gentle-reverse 18s ease-in-out infinite' }}>
            <path
              d="M0,300 C360,200 540,400 900,300 C1260,200 1380,400 1440,300 L1440,600 L0,600 Z"
              fill="url(#gradient2)"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#f9a8d4', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>

          {/* Courbes douces à droite - animation douce */}
          <svg className="absolute right-0 top-0 w-1/3 h-full opacity-8" viewBox="0 0 400 600" preserveAspectRatio="none" style={{ animation: 'wave-gentle 20s ease-in-out infinite' }}>
            <path
              d="M400,0 C350,150 300,100 250,250 C200,400 300,500 400,550 L400,0 Z"
              fill="url(#gradient3)"
            />
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fce7f3', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#fbcfe8', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>

          {/* Courbes douces à gauche - animation douce inverse */}
          <svg className="absolute left-0 bottom-0 w-1/3 h-full opacity-8" viewBox="0 0 400 600" preserveAspectRatio="none" style={{ animation: 'wave-gentle-reverse 22s ease-in-out infinite' }}>
            <path
              d="M0,600 C50,450 100,500 150,350 C200,200 100,100 0,50 L0,600 Z"
              fill="url(#gradient4)"
            />
            <defs>
              <linearGradient id="gradient4" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#fbcfe8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#fce7f3', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Contenu principal */}
        <div className="relative container-custom h-full flex flex-col justify-center items-center text-center z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-title font-bold mb-6 text-neutral-800 leading-tight">
            Compositions Florales Artisanales
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-neutral-600 font-subtitle italic">
            Découvrez nos bouquets uniques, créés avec passion pour embellir vos moments spéciaux
          </p>

          <button
            onClick={() => {
              document.getElementById('bouquets')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-primary-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl btn-floral relative overflow-hidden group z-40 cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center w-full h-full">
              {/* Logo fleur clairement identifiable */}
              <svg className="w-6 h-6 mr-3 text-white group-hover:text-primary-100 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Tige de la fleur */}
                <path d="M12 22V14" strokeLinecap="round"/>
                {/* Feuille */}
                <path d="M12 18c-2 0-3-1-3-3 0-1 1-2 3-2s3 1 3 2c0 2-1 3-3 3z" fill="currentColor" opacity="0.7"/>
                {/* Pétales - 5 pétales clairement visibles */}
                <path d="M12 8c-1.5 0-3 1-3 2.5 0 1 1 2 3 2s3-1 3-2.5c0-1.5-1.5-2.5-3-2.5z" fill="currentColor"/>
                <path d="M8 10.5c0-1.5 1-3 2.5-3s2.5 1 2.5 3-1 3-2.5 3-2.5-1-2.5-3z" fill="currentColor"/>
                <path d="M16 10.5c0-1.5-1-3-2.5-3s-2.5 1-2.5 3 1 3 2.5 3 2.5-1 2.5-3z" fill="currentColor"/>
                <path d="M10 13.5c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z" fill="currentColor"/>
                <path d="M14 13.5c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z" fill="currentColor"/>
                {/* Centre de la fleur */}
                <circle cx="12" cy="10.5" r="1.5" fill="currentColor" stroke="white" strokeWidth="0.5"/>
              </svg>
              Découvrez nos bouquets
            </span>
          </button>
        </div>

        {/* Éléments floraux décoratifs */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-5"></div>
      </section>

      {/* Horaires Section */}
      <section className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <HorairesWidget />
        </div>
      </section>

      {/* Bouquets Section */}
      <section id="bouquets" className="container-custom py-16 mt-8 md:mt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-title font-bold text-neutral-900 mb-4">
            Nos Bouquets
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto font-subtitle">
            Chaque bouquet est crée avec soin en utilisant les fleurs les plus fraiches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bouquets.map((bouquet, index) => (
            <BouquetCard
              key={bouquet.id}
              bouquet={bouquet}
              onOrder={handleOrder}
              className={`fade-in-down ${index > 0 ? 'opacity-0' : ''}`}
              style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'both'}}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
