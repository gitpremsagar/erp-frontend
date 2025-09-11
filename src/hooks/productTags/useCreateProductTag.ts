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
    } catch (err: unknown) {
      let errorMessage = 'Failed to create product tag';
      
      // Handle specific HTTP status codes
      if (err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 'status' in err.response) {
        const status = err.response.status;
        if (status === 409) {
          errorMessage = 'A product tag with this name already exists. Please choose a different name.';
        } else if (status === 400) {
          errorMessage = 'Please check your input and try again.';
        } else if (status === 401) {
          errorMessage = 'You are not authorized to create product tags.';
        } else if (status === 500) {
          errorMessage = 'Server error occurred. Please try again later.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
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
