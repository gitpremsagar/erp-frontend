import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchSubCategories } from '@/redux/slices/subCategoriesSlice';
import { useEffect } from 'react';

export const useSubCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subCategories, isLoading, error } = useSelector((state: RootState) => state.subCategories);

  const loadSubCategories = () => {
    dispatch(fetchSubCategories());
  };

  useEffect(() => {
    if (subCategories.length === 0 && !isLoading && !error) {
      loadSubCategories();
    }
  }, [subCategories.length, isLoading, error]);

  return {
    subCategories,
    isLoading,
    error,
    loadSubCategories,
  };
};
