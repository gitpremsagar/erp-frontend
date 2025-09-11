import { customAxios } from '../api/custom-axios-request';
import { API } from '../constants';
import { 
  SubCategory, 
  SubCategoriesResponse, 
  GetSubCategoriesParams, 
  CreateSubCategoryData, 
  UpdateSubCategoryData 
} from '@/lib/types/subCategories/SubCategory.type';

export const subCategoryServices = {
  async getSubCategories(params: GetSubCategoriesParams = {}): Promise<SubCategoriesResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.categoryId) queryParams.append('categoryId', params.categoryId);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${API.SUB_CATEGORIES.GET_ALL_SUB_CATEGORIES}?${queryParams.toString()}`;
      const response = await customAxios.get(url);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
      throw error;
    }
  },

  async getSubCategoryById(id: string): Promise<SubCategory> {
    try {
      const url = API.SUB_CATEGORIES.GET_SUB_CATEGORY_BY_ID.replace(':id', id);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching sub-category:', error);
      throw error;
    }
  },

  async createSubCategory(data: CreateSubCategoryData): Promise<SubCategory> {
    try {
      const response = await customAxios.post(API.SUB_CATEGORIES.CREATE_SUB_CATEGORY, data);
      return response.data;
    } catch (error) {
      console.error('Error creating sub-category:', error);
      throw error;
    }
  },

  async updateSubCategory(id: string, data: UpdateSubCategoryData): Promise<SubCategory> {
    try {
      const url = API.SUB_CATEGORIES.UPDATE_SUB_CATEGORY.replace(':id', id);
      const response = await customAxios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating sub-category:', error);
      throw error;
    }
  },

  async deleteSubCategory(id: string): Promise<void> {
    try {
      const url = API.SUB_CATEGORIES.DELETE_SUB_CATEGORY.replace(':id', id);
      await customAxios.delete(url);
    } catch (error) {
      console.error('Error deleting sub-category:', error);
      throw error;
    }
  }
};
