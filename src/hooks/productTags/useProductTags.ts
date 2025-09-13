import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchProductTags } from '@/redux/slices/productTagsSlice';
import { useEffect, useRef } from 'react';

export const useProductTags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productTags, isLoading, error } = useSelector((state: RootState) => state.productTags);
  const hasLoadedRef = useRef(false);

  const loadProductTags = () => {
    dispatch(fetchProductTags());
  };

  useEffect(() => {
    console.log('loading product tags called in useProductTags hook');
    if (!hasLoadedRef.current && !isLoading && !error) {
      hasLoadedRef.current = true;
      loadProductTags();
    }
  }, [isLoading, error]);

  return {
    productTags,
    isLoading,
    error,
    loadProductTags,
  };
};