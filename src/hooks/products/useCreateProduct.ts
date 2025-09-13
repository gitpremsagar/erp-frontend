import { useState } from 'react';
import { productServices } from '@/lib/services/productServices';
import { CreateProductSchema } from '@/lib/Schemas/productForm.schema';
import { z } from 'zod';

type CreateProductFormData = z.infer<typeof CreateProductSchema>;

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (data: CreateProductFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productServices.createProduct(data);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error,
  };
};
