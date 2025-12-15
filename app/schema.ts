// Schema.org JSON-LD pour le SEO local
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Florist',
  name: "Fleurs com'Florie",
  image: 'https://fleurs-comflorie.fr/images/logo.jpg',
  '@id': 'https://fleurs-comflorie.fr',
  url: 'https://fleurs-comflorie.fr',
  telephone: '+33-0-00-00-00-00', // À compléter
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Adresse à compléter',
    addressLocality: 'Villeneuve-Lès-Maguelone',
    postalCode: '34750',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.5333, // Coordonnées approximatives de Villeneuve-Lès-Maguelone
    longitude: 3.8667,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/fleurs-comflorie', // À compléter avec le vrai lien
    'https://www.facebook.com/fleurs-comflorie', // À compléter avec le vrai lien
  ],
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 43.5333,
      longitude: 3.8667,
    },
    geoRadius: '25000', // Rayon de 25km (Montpellier et environs)
  },
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  currenciesAccepted: 'EUR',
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: "Fleurs com'Florie",
  url: 'https://fleurs-comflorie.fr',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://fleurs-comflorie.fr/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}
