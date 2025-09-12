import { useState } from 'react';
import { productServices } from '@/lib/services/productServices';
import { CreateProductSchema } from '@/lib/Schemas/productForm.schema';
import { z } from 'zod';

type UpdateProductFormData = z.infer<typeof CreateProductSchema>;

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (id: string, data: UpdateProductFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productServices.updateProduct(id, data);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProduct,
    loading,
    error,
  };
};
