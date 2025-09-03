import { useState, useMemo } from 'react';
import { Product } from './types';
import { dummyProducts } from './mockData';

export function useProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return dummyProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.mrp - b.mrp;
        case 'price-high':
          return b.mrp - a.mrp;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filteredProducts, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredProducts,
    sortedProducts,
    totalProducts: dummyProducts.length
  };
}
