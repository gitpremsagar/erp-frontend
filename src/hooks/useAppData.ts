import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchCategories } from '@/redux/slices/categoriesSlice';
import { fetchSubCategories } from '@/redux/slices/subCategoriesSlice';
import { fetchProductTags } from '@/redux/slices/productTagsSlice';
import { useEffect } from 'react';

export const useAppData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loadAllData = () => {
    // Fetch all data in parallel
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchProductTags());
  };

  useEffect(() => {
    // Load all data when the hook is first used
    loadAllData();
  }, []);

  return {
    loadAllData,
  };
};
