import { customAxios } from '../api/custom-axios-request';
import { API } from '../constants';
import { 
  Category, 
  CategoriesResponse, 
  GetCategoriesParams, 
  CreateCategoryData, 
  UpdateCategoryData 
} from '@/lib/types/categories/Category.type';

export const categoryServices = {
  async getCategories(params: GetCategoriesParams = {}): Promise<CategoriesResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${API.CATEGORIES.GET_ALL_CATEGORIES}?${queryParams.toString()}`;
      // console.log('category url\n', url);
      const response = await customAxios.get(url);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getCategoryById(id: string): Promise<Category> {
    try {
      const url = API.CATEGORIES.GET_CATEGORY_BY_ID.replace(':id', id);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  async createCategory(data: CreateCategoryData): Promise<Category> {
    try {
      const response = await customAxios.post(API.CATEGORIES.CREATE_CATEGORY, data);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  async updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
    try {
      const url = API.CATEGORIES.UPDATE_CATEGORY.replace(':id', id);
      const response = await customAxios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  async deleteCategory(id: string): Promise<void> {
    try {
      const url = API.CATEGORIES.DELETE_CATEGORY.replace(':id', id);
      await customAxios.delete(url);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};
