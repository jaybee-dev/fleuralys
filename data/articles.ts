export interface Article {
  id: string
  titre: string
  extrait: string
  image: string
  instagramUrl: string
  datePublication: string
}

export const articles: Article[] = [
  {
    id: '1',
    titre: 'Comment entretenir vos bouquets de roses',
    extrait: 'Découvrez nos meilleurs conseils pour prolonger la vie de vos roses fraîches...',
    image: '/images/article-roses.svg',
    instagramUrl: 'https://instagram.com/p/example1',
    datePublication: '2024-11-15',
  },
  {
    id: '2',
    titre: 'Les fleurs de saison en hiver',
    extrait: 'Explorez les plus belles compositions florales pour illuminer votre hiver...',
    image: '/images/article-hiver.svg',
    instagramUrl: 'https://instagram.com/p/example2',
    datePublication: '2024-11-10',
  },
  {
    id: '3',
    titre: 'Créer un centre de table floral',
    extrait: 'Apprenez à réaliser un magnifique centre de table pour vos événements...',
    image: '/images/article-centre-table.svg',
    instagramUrl: 'https://instagram.com/p/example3',
    datePublication: '2024-11-05',
  },
  {
    id: '4',
    titre: 'Le langage des fleurs',
    extrait: 'Chaque fleur a sa signification. Découvrez ce que vos bouquets racontent...',
    image: '/images/article-langage.svg',
    instagramUrl: 'https://instagram.com/p/example4',
    datePublication: '2024-10-28',
  },
]
