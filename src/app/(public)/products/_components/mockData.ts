import { Product, Category, SortOption } from './types';

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: 'Haldiram Namkeen Mix',
    category: 'Namkeen',
    mrp: 45.99,
    originalPrice: 59.99,
    image: '/namkeen-mix.jpg',
    description: 'Traditional savory snacks mix with premium quality ingredients',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Haldiram Sweets Assortment',
    category: 'Sweets',
    mrp: 89.99,
    originalPrice: 119.99,
    image: '/sweets.jpg',
    description: 'Premium quality Indian sweets assortment',
    rating: 4.8,
    reviews: 95,
    inStock: true,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Haldiram Papad Variety Pack',
    category: 'Papad',
    mrp: 35.50,
    image: '/papad.jpg',
    description: 'Crispy papad varieties - perfect for any meal',
    rating: 4.3,
    reviews: 67,
    inStock: true
  },
  {
    id: 4,
    name: 'Haldiram Ready-to-Eat Dal Khichdi',
    category: 'Ready-to-Eat',
    mrp: 25.99,
    image: '/ready-to-eat.jpg',
    description: 'Convenient and delicious dal khichdi ready in minutes',
    rating: 4.2,
    reviews: 43,
    inStock: true
  },
  {
    id: 5,
    name: 'Haldiram Aloo Bhujia',
    category: 'Namkeen',
    mrp: 32.99,
    image: '/aloo-bhujia.jpg',
    description: 'Crispy potato-based namkeen with authentic spices',
    rating: 4.6,
    reviews: 156,
    inStock: true
  },
  {
    id: 6,
    name: 'Haldiram Rasgulla',
    category: 'Sweets',
    mrp: 55.99,
    image: '/rasgulla.jpg',
    description: 'Soft and spongy rasgulla in sugar syrup',
    rating: 4.7,
    reviews: 89,
    inStock: false
  },
  {
    id: 7,
    name: 'Haldiram Moong Dal Papad',
    category: 'Papad',
    mrp: 28.50,
    image: '/moong-papad.jpg',
    description: 'Healthy moong dal papad with traditional taste',
    rating: 4.1,
    reviews: 34,
    inStock: true
  },
  {
    id: 8,
    name: 'Haldiram Paneer Curry',
    category: 'Ready-to-Eat',
    mrp: 42.99,
    image: '/paneer-curry.jpg',
    description: 'Rich and creamy paneer curry ready to serve',
    rating: 4.4,
    reviews: 52,
    inStock: true,
    isNew: true
  },
  {
    id: 9,
    name: 'Haldiram Chana Dal Namkeen',
    category: 'Namkeen',
    mrp: 38.99,
    image: '/chana-dal.jpg',
    description: 'Crunchy chana dal namkeen with perfect seasoning',
    rating: 4.3,
    reviews: 78,
    inStock: true
  },
  {
    id: 10,
    name: 'Haldiram Gulab Jamun',
    category: 'Sweets',
    mrp: 65.99,
    image: '/gulab-jamun.jpg',
    description: 'Soft and sweet gulab jamun in rose-flavored syrup',
    rating: 4.9,
    reviews: 112,
    inStock: true,
    isFeatured: true
  },
  {
    id: 11,
    name: 'Haldiram Urad Dal Papad',
    category: 'Papad',
    mrp: 31.50,
    image: '/urad-papad.jpg',
    description: 'Traditional urad dal papad with authentic taste',
    rating: 4.0,
    reviews: 29,
    inStock: true
  },
  {
    id: 12,
    name: 'Haldiram Vegetable Biryani',
    category: 'Ready-to-Eat',
    mrp: 48.99,
    image: '/biryani.jpg',
    description: 'Aromatic vegetable biryani with authentic spices',
    rating: 4.5,
    reviews: 61,
    inStock: true
  }
];

export const categories: Category[] = [
  { id: 'all', name: 'All Products' },
  { id: 'namkeen', name: 'Namkeen' },
  { id: 'sweets', name: 'Sweets' },
  { id: 'papad', name: 'Papad' },
  { id: 'ready-to-eat', name: 'Ready-to-Eat' }
];

export const sortOptions: SortOption[] = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Highest Rated' },
  { id: 'newest', name: 'Newest First' }
];
