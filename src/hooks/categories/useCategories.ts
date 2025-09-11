import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchCategories } from '@/redux/slices/categoriesSlice';
import { useEffect } from 'react';

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories);

  const loadCategories = () => {
    dispatch(fetchCategories());
  };

  useEffect(() => {
    if (categories.length === 0 && !isLoading && !error) {
      loadCategories();
    }
  }, [categories.length, isLoading, error]);

  return {
    categories,
    isLoading,
    error,
    loadCategories,
  };
};
