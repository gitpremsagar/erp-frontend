import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { CreateCategorySchema } from '@/lib/Schemas/categoryForm.schema';
import { categoryServices } from '@/lib/services/categoryServices';
import { addCategory } from '@/redux/slices/categoriesSlice';
import { AppDispatch } from '@/redux/store';

type CreateCategoryFormData = z.infer<typeof CreateCategorySchema>;

export const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const createCategory = async (data: CreateCategoryFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoryServices.createCategory(data);
      dispatch(addCategory(response));
      return response;
    } catch (err: unknown) {
      let errorMessage = 'Failed to create category';
      
      // Handle specific HTTP status codes
      if (err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 'status' in err.response) {
        const status = err.response.status;
        if (status === 409) {
          errorMessage = 'A category with this name already exists. Please choose a different name.';
        } else if (status === 400) {
          errorMessage = 'Please check your input and try again.';
        } else if (status === 401) {
          errorMessage = 'You are not authorized to create categories.';
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
    createCategory,
    loading,
    error,
  };
};
