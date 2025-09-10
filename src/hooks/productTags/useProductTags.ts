import { useState, useEffect } from 'react';
import { productTagServices } from '@/lib/services/productTagServices';
import { 
  ProductTag, 
  ProductTagsResponse, 
  GetProductTagsParams, 
  CreateProductTagData, 
  UpdateProductTagData 
} from '@/lib/types/products/ProductTag.type';

export const useProductTags = (initialParams: GetProductTagsParams = {}) => {
  const [productTags, setProductTags] = useState<ProductTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchProductTags = async (params: GetProductTagsParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response: ProductTagsResponse = await productTagServices.getProductTags(params);
      setProductTags(response.productTags);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product tags');
      console.error('Error fetching product tags:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProductTag = async (data: CreateProductTagData): Promise<ProductTag> => {
    try {
      const newTag = await productTagServices.createProductTag(data);
      // Refresh the list to include the new tag
      await fetchProductTags(initialParams);
      return newTag;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product tag');
      throw err;
    }
  };

  const updateProductTag = async (id: string, data: UpdateProductTagData): Promise<ProductTag> => {
    try {
      const updatedTag = await productTagServices.updateProductTag(id, data);
      // Update the tag in the local state
      setProductTags(prev => prev.map(tag => tag.id === id ? updatedTag : tag));
      return updatedTag;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product tag');
      throw err;
    }
  };

  const deleteProductTag = async (id: string): Promise<void> => {
    try {
      await productTagServices.deleteProductTag(id);
      // Remove the tag from local state
      setProductTags(prev => prev.filter(tag => tag.id !== id));
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product tag');
      throw err;
    }
  };

  const refreshProductTags = () => {
    fetchProductTags(initialParams);
  };

  useEffect(() => {
    fetchProductTags(initialParams);
  }, []);

  return {
    productTags,
    loading,
    error,
    pagination,
    fetchProductTags,
    createProductTag,
    updateProductTag,
    deleteProductTag,
    refreshProductTags,
  };
};
