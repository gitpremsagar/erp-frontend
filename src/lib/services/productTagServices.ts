import { customAxios } from '../api/custom-axios-request';
import { API } from '../constants';
import { 
  ProductTag, 
  ProductTagsResponse, 
  GetProductTagsParams, 
  CreateProductTagData, 
  UpdateProductTagData 
} from '@/lib/types/products/ProductTag.type';

export const productTagServices = {
  async getProductTags(params: GetProductTagsParams = {}): Promise<ProductTagsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${API.PRODUCT_TAGS.GET_ALL_PRODUCT_TAGS}?${queryParams.toString()}`;
      const response = await customAxios.get(url);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching product tags:', error);
      throw error;
    }
  },

  async getProductTagById(id: string): Promise<ProductTag> {
    try {
      const url = API.PRODUCT_TAGS.GET_PRODUCT_TAG_BY_ID.replace(':id', id);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching product tag:', error);
      throw error;
    }
  },

  async createProductTag(data: CreateProductTagData): Promise<ProductTag> {
    try {
      const response = await customAxios.post(API.PRODUCT_TAGS.CREATE_PRODUCT_TAG, data);
      return response.data;
    } catch (error) {
      console.error('Error creating product tag:', error);
      throw error;
    }
  },

  async updateProductTag(id: string, data: UpdateProductTagData): Promise<ProductTag> {
    try {
      const url = API.PRODUCT_TAGS.UPDATE_PRODUCT_TAG.replace(':id', id);
      const response = await customAxios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating product tag:', error);
      throw error;
    }
  },

  async deleteProductTag(id: string): Promise<void> {
    try {
      const url = API.PRODUCT_TAGS.DELETE_PRODUCT_TAG.replace(':id', id);
      await customAxios.delete(url);
    } catch (error) {
      console.error('Error deleting product tag:', error);
      throw error;
    }
  }
};
