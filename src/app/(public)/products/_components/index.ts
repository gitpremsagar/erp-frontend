export { default as ProductsHeader } from './ProductsHeader';
export { default as ProductsFilters } from './ProductsFilters';
export { default as ProductCard } from './ProductCard';
export { default as ProductsGrid } from './ProductsGrid';
export { default as ProductsFeatures } from './ProductsFeatures';
export { useProducts } from './useProducts';
export * from './types';

// Sort options for the products page
export const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'stock-high', name: 'Stock: High to Low' },
  { id: 'stock-low', name: 'Stock: Low to High' },
  { id: 'expiry-soon', name: 'Expiring Soon' },
  { id: 'newest', name: 'Newest First' }
];
