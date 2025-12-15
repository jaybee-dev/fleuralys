'use client'

import Image from 'next/image'
import type { Bouquet } from '@/data/bouquets'

interface BouquetCardProps {
  bouquet: Bouquet
  onOrder: (bouquetId: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function BouquetCard({ bouquet, onOrder, className = '', style }: BouquetCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${className}`} style={style}>
      <div className="relative h-64 w-full flex-shrink-0 overflow-hidden group">
        <Image
          src={bouquet.image}
          alt={bouquet.nom}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out ${!bouquet.disponible ? 'opacity-60 grayscale-[30%]' : ''}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge de statut */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
          bouquet.disponible
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          <svg className="w-4 h-4 inline-block mr-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            {bouquet.disponible ? (
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            )}
          </svg>
          {bouquet.disponible ? 'Disponible' : 'Indisponible'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2">
          {bouquet.nom}
        </h3>
        <p className="text-sm text-neutral-600 mb-4 flex-grow min-h-[2.5rem]">
          {bouquet.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary-600 flex items-center">
            {bouquet.prix.toFixed(2)} €
            {bouquet.disponible && (
              <svg className="w-5 h-5 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </span>
          <button
            onClick={() => onOrder(bouquet.id)}
            disabled={!bouquet.disponible}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              bouquet.disponible
                ? 'btn-primary shadow-md hover:shadow-lg'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {bouquet.disponible ? (
              <>
                <svg className="w-4 h-4 inline-block mr-1 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
                Commander
              </>
            ) : (
              'Indisponible'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
