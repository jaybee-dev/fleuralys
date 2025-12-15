import Image from 'next/image'

const galerieImages = [
  {
    id: 1,
    src: '/images/galerie-1.svg',
    alt: 'Composition florale mariage',
    titre: 'Mariage elegant',
  },
  {
    id: 2,
    src: '/images/galerie-2.svg',
    alt: 'Bouquet de roses rouges',
    titre: 'Passion rouge',
  },
  {
    id: 3,
    src: '/images/galerie-3.svg',
    alt: 'Centre de table floral',
    titre: 'Centre de table',
  },
  {
    id: 4,
    src: '/images/galerie-4.svg',
    alt: 'Bouquet champetre',
    titre: 'Style champetre',
  },
  {
    id: 5,
    src: '/images/galerie-5.svg',
    alt: 'Composition florale moderne',
    titre: 'Design moderne',
  },
  {
    id: 6,
    src: '/images/galerie-6.svg',
    alt: 'Bouquet de pivoines',
    titre: 'Pivoines delicates',
  },
  {
    id: 7,
    src: '/images/galerie-7.svg',
    alt: 'Arrangement floral tropical',
    titre: 'Tropical exotique',
  },
  {
    id: 8,
    src: '/images/galerie-8.svg',
    alt: 'Bouquet printanier',
    titre: 'Fraicheur printaniere',
  },
  {
    id: 9,
    src: '/images/galerie-9.svg',
    alt: 'Composition florale zen',
    titre: 'Harmonie zen',
  },
]

export default function GaleriePage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12 fade-in-down" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
        <div className="inline-block mb-4">
          <svg className="w-12 h-12 text-primary-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
          Notre Galerie Florale
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto italic">
          Découvrez nos plus belles créations florales réalisées avec passion pour nos clients
        </p>
        <div className="mt-6">
          <svg className="w-24 h-8 text-primary-300 mx-auto" fill="currentColor" viewBox="0 0 100 20">
            <path d="M5 15 Q 25 5, 45 15 T 85 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="25" cy="10" r="3" fill="currentColor"/>
            <circle cx="50" cy="15" r="2" fill="currentColor"/>
            <circle cx="75" cy="8" r="2.5" fill="currentColor"/>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galerieImages.map((image, index) => (
          <div
            key={image.id}
            className={`group relative h-80 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-in-out fade-in-down`}
            style={{animationDelay: `${index * 0.1}s`, animationFillMode: 'both'}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-transparent rounded-lg"></div>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-serif font-bold flex items-center">
                  <svg className="w-6 h-6 mr-2 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {image.titre}
                </h3>
                <p className="text-primary-200 text-sm mt-1 italic">
                  <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Création artisanale
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
