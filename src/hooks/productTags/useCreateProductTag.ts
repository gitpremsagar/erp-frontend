import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productTagServices } from '../../lib/services/productTagServices';
import { CreateProductTagSchema } from '../../lib/Schemas/productTagForm.schema';
import { addProductTag } from '../../redux/slices/productTagsSlice';
import { AppDispatch } from '../../redux/store';
import { z } from 'zod';

type CreateProductTagFormData = z.infer<typeof CreateProductTagSchema>;

export const useCreateProductTag = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const createProductTag = async (data: CreateProductTagFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productTagServices.createProductTag(data);
      dispatch(addProductTag(response));
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product tag';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProductTag,
    loading,
    error,
  };
};
