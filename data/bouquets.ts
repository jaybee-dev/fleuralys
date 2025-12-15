export interface Bouquet {
  id: string
  nom: string
  description: string
  prix: number
  image: string
  stock: number
  disponible: boolean
  lemonsqueezyProductId?: string
  created_at?: string
  updated_at?: string
}

export const bouquets: Bouquet[] = [
  {
    id: '1',
    nom: 'Bouquet Romance',
    description: 'Roses rouges et blanches avec des touches de verdure délicate',
    prix: 45.00,
    image: '/images/bouquet-romance.jpg',
    stock: 10,
    disponible: true,
    lemonsqueezyProductId: 'prod_romance',
  },
  {
    id: '2',
    nom: 'Bouquet Printemps',
    description: 'Tulipes colorées et fleurs de saison dans un arrangement joyeux',
    prix: 35.00,
    image: '/images/bouquet-printemps.jpg',
    stock: 15,
    disponible: true,
    lemonsqueezyProductId: 'prod_printemps',
  },
  {
    id: '3',
    nom: 'Bouquet Élégance',
    description: 'Lys blancs et eucalyptus pour une composition raffinée',
    prix: 55.00,
    image: '/images/bouquet-elegance.jpg',
    stock: 8,
    disponible: true,
    lemonsqueezyProductId: 'prod_elegance',
  },
  {
    id: '4',
    nom: 'Bouquet Champêtre',
    description: 'Fleurs des champs et graminées pour un style naturel',
    prix: 40.00,
    image: '/images/bouquet-champetre.jpg',
    stock: 12,
    disponible: true,
    lemonsqueezyProductId: 'prod_champetre',
  },
  {
    id: '5',
    nom: 'Bouquet Passion',
    description: 'Pivoines et roses dans des tons roses et fuchsia',
    prix: 60.00,
    image: '/images/bouquet-passion.jpg',
    stock: 6,
    disponible: true,
    lemonsqueezyProductId: 'prod_passion',
  },
  {
    id: '6',
    nom: 'Bouquet Zen',
    description: 'Orchidées et bambou pour une ambiance apaisante',
    prix: 50.00,
    image: '/images/bouquet-zen.jpg',
    stock: 10,
    disponible: true,
    lemonsqueezyProductId: 'prod_zen',
  },
]
