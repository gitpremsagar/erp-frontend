import { useState, useEffect } from 'react';
import { productServices } from '@/lib/services/productServices';
import { Product } from '@/lib/types/products/Product.type';

export const useGetProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await productServices.getProductById(id);
        setProduct(response);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};
