import { useState, useMemo, useEffect } from 'react';
import { Product, Category, GetProductsParams } from '@/app/(public)/products/_components/types';
import { productServices } from '@/lib/services/productServices';

export function useProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch products from API
  const fetchProducts = async (params: GetProductsParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productServices.getProducts({
        page: params.page || 1,
        limit: params.limit || 20,
        category: params.category === 'all' ? undefined : params.category,
        search: params.search || undefined,
        sortBy: params.sortBy || undefined,
        sortOrder: params.sortOrder || 'asc'
      });

      setProducts(response.products.map(product => ({
        ...product,
        inStock: product.stock > 0,
        isNew: new Date(product.stockEntryDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
        isFeatured: product.stock > product.lowStockLimit && product.stock < product.overStockLimit
      })));
      
      setPagination(response.pagination);
      
      // Extract unique categories for filtering
      const uniqueCategories = Array.from(
        new Map(response.products.map(p => [p.Category.id, p.Category])).values()
      );
      setCategories([
        { id: 'all', name: 'All Products' },
        ...uniqueCategories
      ]);
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products when search, category, or sort changes
  useEffect(() => {
    const params: GetProductsParams = {
      page: 1,
      limit: 20,
      search: searchTerm || undefined,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy: sortBy === 'featured' ? undefined : sortBy,
      sortOrder: 'asc'
    };
    
    fetchProducts(params);
  }, [searchTerm, selectedCategory, sortBy]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.productCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             product.Category.id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.mrp - b.mrp;
        case 'price-high':
          return b.mrp - a.mrp;
        case 'stock-high':
          return b.stock - a.stock;
        case 'stock-low':
          return a.stock - b.stock;
        case 'expiry-soon':
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        case 'newest':
          return new Date(b.stockEntryDate).getTime() - new Date(a.stockEntryDate).getTime();
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filteredProducts, sortBy]);

  const refreshProducts = () => {
    fetchProducts({
      page: 1,
      limit: 20,
      search: searchTerm || undefined,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy: sortBy === 'featured' ? undefined : sortBy,
      sortOrder: 'asc'
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredProducts,
    sortedProducts,
    totalProducts: pagination.total,
    loading,
    error,
    pagination,
    refreshProducts,
    categories
  };
}
