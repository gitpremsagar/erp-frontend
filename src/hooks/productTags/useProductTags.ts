import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchProductTags } from '@/redux/slices/productTagsSlice';
import { useEffect } from 'react';

export const useProductTags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productTags, isLoading, error } = useSelector((state: RootState) => state.productTags);

  const loadProductTags = () => {
    dispatch(fetchProductTags());
  };

  useEffect(() => {
    if (productTags.length === 0 && !isLoading && !error) {
      loadProductTags();
    }
  }, [productTags.length, isLoading, error]);

  return {
    productTags,
    isLoading,
    error,
    loadProductTags,
  };
};