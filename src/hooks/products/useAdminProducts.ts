import { useState, useEffect } from 'react';
import { Product, ProductsResponse, GetProductsParams } from '@/lib/types/products/Product.type';
import { productServices } from '@/lib/services/productServices';

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1000,
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
        limit: params.limit || 1000,
        category: params.category === 'all' ? undefined : params.category,
        search: params.search || undefined,
        sortBy: params.sortBy || undefined,
        sortOrder: params.sortOrder || 'asc'
      });

      setProducts(response.products);
      setPagination(response.pagination);
      
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

  const refreshProducts = (params: GetProductsParams = {}) => {
    fetchProducts({
      page: 1,
      limit: 1000,
      ...params
    });
  };

  const loadPage = (page: number) => {
    fetchProducts({
      page,
      limit: pagination.limit
    });
  };

  const deleteProduct = async (id: string) => {
    try {
      await productServices.deleteProduct(id);
      // Refresh the current page after deletion
      fetchProducts({
        page: pagination.page,
        limit: pagination.limit
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    pagination,
    refreshProducts,
    loadPage,
    deleteProduct
  };
}
