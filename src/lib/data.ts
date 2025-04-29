import type { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For flash sales/discounts
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  images: string[]; // URLs or paths to images
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  isFeatured?: boolean;
  isOnSale?: boolean;
  saleEndDate?: Date; // For flash sales
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export const categories: Category[] = [
  { id: 'cat1', name: 'Electronics', slug: 'electronics', imageUrl: 'https://picsum.photos/seed/electronics/300/200' },
  { id: 'cat2', name: 'Fashion', slug: 'fashion', imageUrl: 'https://picsum.photos/seed/fashion/300/200' },
  { id: 'cat3', name: 'Home Goods', slug: 'home-goods', imageUrl: 'https://picsum.photos/seed/home/300/200' },
  { id: 'cat4', name: 'Sports', slug: 'sports', imageUrl: 'https://picsum.photos/seed/sports/300/200' },
  { id: 'cat5', name: 'Books', slug: 'books', imageUrl: 'https://picsum.photos/seed/books/300/200' },
  { id: 'cat6', name: 'Beauty', slug: 'beauty', imageUrl: 'https://picsum.photos/seed/beauty/300/200' },
];

export const products: Product[] = [
  // Electronics (5)
  {
    id: 'prod1',
    slug: 'wireless-noise-cancelling-headphones',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound quality with industry-leading noise cancellation. Long battery life.',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Electronics',
    brand: 'SoundWave',
    rating: 4.8,
    reviewsCount: 1250,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/headphones1/600/600', 'https://picsum.photos/seed/headphones2/600/600', 'https://picsum.photos/seed/headphones3/600/600'],
    variants: { colors: ['Black', 'Silver', 'Midnight Blue'] },
    isFeatured: true,
    isOnSale: true,
    saleEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    id: 'prod2',
    slug: 'ultra-hd-smart-tv-55-inch',
    name: 'Ultra HD Smart TV 55 Inch',
    description: 'Stunning 4K picture quality with smart features and voice control.',
    price: 599.00,
    category: 'Electronics',
    brand: 'VisionX',
    rating: 4.6,
    reviewsCount: 875,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/tv1/600/600', 'https://picsum.photos/seed/tv2/600/600'],
  },
  {
    id: 'prod3',
    slug: 'latest-gen-smartphone',
    name: 'Latest Gen Smartphone',
    description: 'Powerful performance, stunning display, and pro-grade camera system.',
    price: 999.00,
    category: 'Electronics',
    brand: 'TechCore',
    rating: 4.9,
    reviewsCount: 2100,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/phone1/600/600', 'https://picsum.photos/seed/phone2/600/600'],
    variants: { colors: ['Graphite', 'Sierra Blue', 'Gold'] },
  },
  {
    id: 'prod4',
    slug: 'lightweight-laptop-14-inch',
    name: 'Lightweight Laptop 14 Inch',
    description: 'Thin and light laptop perfect for productivity on the go. Fast SSD and long battery life.',
    price: 749.50,
    category: 'Electronics',
    brand: 'NovaPC',
    rating: 4.5,
    reviewsCount: 650,
    stockStatus: 'Low Stock',
    images: ['https://picsum.photos/seed/laptop1/600/600', 'https://picsum.photos/seed/laptop2/600/600'],
  },
  {
    id: 'prod5',
    slug: 'smart-watch-fitness-tracker',
    name: 'Smart Watch & Fitness Tracker',
    description: 'Track your workouts, heart rate, and sleep patterns. Receive notifications on your wrist.',
    price: 129.99,
    category: 'Electronics',
    brand: 'FitLife',
    rating: 4.3,
    reviewsCount: 980,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/watch1/600/600', 'https://picsum.photos/seed/watch2/600/600'],
    variants: { colors: ['Black', 'Rose Gold', 'Silver'] },
    isFeatured: true,
  },
  // Fashion (5)
  {
    id: 'prod6',
    slug: 'mens-classic-denim-jacket',
    name: 'Men\'s Classic Denim Jacket',
    description: 'Timeless style, perfect for layering. Made with durable denim.',
    price: 79.95,
    category: 'Fashion',
    brand: 'Urban Threads',
    rating: 4.7,
    reviewsCount: 530,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/jacket1/600/600', 'https://picsum.photos/seed/jacket2/600/600'],
    variants: { sizes: ['S', 'M', 'L', 'XL'] },
  },
  {
    id: 'prod7',
    slug: 'womens-floral-print-maxi-dress',
    name: 'Women\'s Floral Print Maxi Dress',
    description: 'Elegant and flowy maxi dress with a vibrant floral pattern.',
    price: 64.00,
    category: 'Fashion',
    brand: 'Boho Chic',
    rating: 4.5,
    reviewsCount: 410,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/dress1/600/600', 'https://picsum.photos/seed/dress2/600/600'],
    variants: { sizes: ['XS', 'S', 'M', 'L'], colors: ['Blue Floral', 'Red Floral'] },
  },
  {
    id: 'prod8',
    slug: 'unisex-canvas-sneakers',
    name: 'Unisex Canvas Sneakers',
    description: 'Comfortable and versatile sneakers for everyday wear.',
    price: 49.99,
    originalPrice: 59.99,
    category: 'Fashion',
    brand: 'SoleMate',
    rating: 4.4,
    reviewsCount: 720,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/sneaker1/600/600', 'https://picsum.photos/seed/sneaker2/600/600'],
    variants: { sizes: ['6', '7', '8', '9', '10', '11'], colors: ['White', 'Black', 'Navy'] },
    isOnSale: true,
     saleEndDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
  },
  {
    id: 'prod9',
    slug: 'leather-crossbody-bag',
    name: 'Leather Crossbody Bag',
    description: 'Stylish and practical crossbody bag made from genuine leather.',
    price: 119.00,
    category: 'Fashion',
    brand: 'Artisan Bags',
    rating: 4.8,
    reviewsCount: 350,
    stockStatus: 'Low Stock',
    images: ['https://picsum.photos/seed/bag1/600/600', 'https://picsum.photos/seed/bag2/600/600'],
    variants: { colors: ['Tan', 'Black', 'Brown'] },
    isFeatured: true,
  },
  {
    id: 'prod10',
    slug: 'cashmere-blend-scarf',
    name: 'Cashmere Blend Scarf',
    description: 'Soft and luxurious scarf to keep you warm in style.',
    price: 89.50,
    category: 'Fashion',
    brand: 'Cozy Knits',
    rating: 4.9,
    reviewsCount: 280,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/scarf1/600/600', 'https://picsum.photos/seed/scarf2/600/600'],
    variants: { colors: ['Grey', 'Camel', 'Burgundy'] },
  },
   // Home Goods (4)
  {
    id: 'prod11',
    slug: 'robot-vacuum-cleaner',
    name: 'Robot Vacuum Cleaner',
    description: 'Smart cleaning for your home with mapping technology and app control.',
    price: 349.00,
    category: 'Home Goods',
    brand: 'CleanBot',
    rating: 4.6,
    reviewsCount: 1100,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/vacuum1/600/600', 'https://picsum.photos/seed/vacuum2/600/600'],
  },
  {
    id: 'prod12',
    slug: 'espresso-machine',
    name: 'Espresso Machine',
    description: 'Brew barista-quality espresso at home with this easy-to-use machine.',
    price: 199.99,
    category: 'Home Goods',
    brand: 'CafeMaster',
    rating: 4.7,
    reviewsCount: 780,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/espresso1/600/600', 'https://picsum.photos/seed/espresso2/600/600'],
    isFeatured: true,
  },
  {
    id: 'prod13',
    slug: 'air-purifier-hepa-filter',
    name: 'Air Purifier with HEPA Filter',
    description: 'Removes allergens, dust, and pollutants for cleaner air.',
    price: 129.50,
    category: 'Home Goods',
    brand: 'PureAir',
    rating: 4.5,
    reviewsCount: 550,
    stockStatus: 'Out of Stock',
    images: ['https://picsum.photos/seed/purifier1/600/600', 'https://picsum.photos/seed/purifier2/600/600'],
  },
  {
    id: 'prod14',
    slug: 'memory-foam-pillow-set',
    name: 'Memory Foam Pillow Set (2-Pack)',
    description: 'Ergonomic pillows for comfortable and supportive sleep.',
    price: 59.99,
    category: 'Home Goods',
    brand: 'DreamWell',
    rating: 4.4,
    reviewsCount: 920,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/pillow1/600/600', 'https://picsum.photos/seed/pillow2/600/600'],
  },
  // Sports (3)
  {
    id: 'prod15',
    slug: 'yoga-mat-eco-friendly',
    name: 'Yoga Mat - Eco Friendly',
    description: 'Non-slip, cushioned mat made from sustainable materials.',
    price: 39.95,
    category: 'Sports',
    brand: 'ZenFlow',
    rating: 4.8,
    reviewsCount: 680,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/yogamat1/600/600', 'https://picsum.photos/seed/yogamat2/600/600'],
    variants: { colors: ['Teal', 'Lavender', 'Charcoal'] },
  },
  {
    id: 'prod16',
    slug: 'adjustable-dumbbell-set',
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving design allows you to change weights easily.',
    price: 299.00,
    category: 'Sports',
    brand: 'IronFlex',
    rating: 4.7,
    reviewsCount: 450,
    stockStatus: 'Low Stock',
    images: ['https://picsum.photos/seed/dumbbell1/600/600', 'https://picsum.photos/seed/dumbbell2/600/600'],
  },
  {
    id: 'prod17',
    slug: 'running-shoes-lightweight',
    name: 'Running Shoes - Lightweight',
    description: 'Breathable and cushioned shoes for optimal running performance.',
    price: 109.99,
    category: 'Sports',
    brand: 'StrideFast',
    rating: 4.6,
    reviewsCount: 810,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/runningshoe1/600/600', 'https://picsum.photos/seed/runningshoe2/600/600'],
    variants: { sizes: ['7', '8', '9', '10', '11', '12'], colors: ['Neon Green', 'Black/White', 'Blue'] },
    isFeatured: true,
  },
  // Books (2)
  {
    id: 'prod18',
    slug: 'bestselling-mystery-novel',
    name: 'Bestselling Mystery Novel',
    description: 'A gripping thriller that will keep you on the edge of your seat.',
    price: 14.99,
    category: 'Books',
    brand: 'PageTurner Publishing',
    rating: 4.9,
    reviewsCount: 1500,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/book1/600/600', 'https://picsum.photos/seed/book2/600/600'],
  },
  {
    id: 'prod19',
    slug: 'inspirational-self-help-book',
    name: 'Inspirational Self-Help Book',
    description: 'Unlock your potential and live a more fulfilling life.',
    price: 18.50,
    category: 'Books',
    brand: 'Mindful Press',
    rating: 4.7,
    reviewsCount: 950,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/selfhelp1/600/600', 'https://picsum.photos/seed/selfhelp2/600/600'],
  },
  // Beauty (1)
  {
    id: 'prod20',
    slug: 'organic-facial-serum',
    name: 'Organic Facial Serum',
    description: 'Hydrating and revitalizing serum with natural ingredients.',
    price: 45.00,
    originalPrice: 55.00,
    category: 'Beauty',
    brand: 'GlowNaturally',
    rating: 4.8,
    reviewsCount: 420,
    stockStatus: 'In Stock',
    images: ['https://picsum.photos/seed/serum1/600/600', 'https://picsum.photos/seed/serum2/600/600'],
    isOnSale: true,
     saleEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
];


export const reviews: Review[] = [
  // Reviews for prod1
  { id: 'rev1', productId: 'prod1', userName: 'Alice', rating: 5, comment: 'Amazing sound quality and noise cancellation!', date: new Date('2024-05-10') },
  { id: 'rev2', productId: 'prod1', userName: 'Bob', rating: 4, comment: 'Very comfortable, but the price is a bit high.', date: new Date('2024-05-12') },
  // Reviews for prod7
  { id: 'rev3', productId: 'prod7', userName: 'Charlie', rating: 5, comment: 'Beautiful dress, perfect for summer!', date: new Date('2024-06-01') },
  { id: 'rev4', productId: 'prod7', userName: 'Diana', rating: 4, comment: 'Lovely print, but runs slightly large.', date: new Date('2024-06-05') },
  // Reviews for prod17
  { id: 'rev5', productId: 'prod17', userName: 'Ethan', rating: 5, comment: 'Super lightweight and comfortable for long runs.', date: new Date('2024-07-15') },
  { id: 'rev6', productId: 'prod17', userName: 'Fiona', rating: 4, comment: 'Good value, great cushioning.', date: new Date('2024-07-18') },
];

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

// Helper function to get related products (simple version: same category, different product)
export const getRelatedProducts = (currentProduct: Product): Product[] => {
  return products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4); // Limit to 4 related products
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isFeatured).slice(0, 8); // Limit to 8 featured products
};

// Helper function to get flash sale products
export const getFlashSaleProducts = (): Product[] => {
    const now = new Date();
    return products
        .filter(p => p.isOnSale && p.saleEndDate && p.saleEndDate > now)
        .sort((a, b) => (a.saleEndDate?.getTime() ?? 0) - (b.saleEndDate?.getTime() ?? 0)) // Sort by soonest end date
        .slice(0, 4); // Limit to 4 flash sale products
};

// Helper function to get reviews for a product
export const getReviewsForProduct = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};
