import { customAxios } from '../api/custom-axios-request';
import { API } from '../constants';

export interface ApiProduct {
  id: string;
  name: string;
  mrp: number;
  productCode: string;
  description: string;
  expiryDate: string;
  validity: string;
  stock: number;
  stockEntryDate: string;
  lowStockLimit: number;
  overStockLimit: number;
  grammage: number;
  lowStockAlertColor: string;
  lowStockAlertMessage: string;
  overStockAlertColor: string;
  overStockAlertMessage: string;
  inStockAlertColor: string;
  inStockAlertMessage: string;
  expiryAlertDays: number;
  expiryAlertColor: string;
  expiryAlertMessage: string;
  tags: string[];
  imageUrl: string;
  categoryId: string;
  groupId: string;
  subCategoryId: string;
  createdAt: string;
  updatedAt: string;
  Category: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  Group: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  SubCategory: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
  };
}

export interface ApiProductsResponse {
  products: ApiProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  subCategory?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const productServices = {
  async getProducts(params: GetProductsParams = {}): Promise<ApiProductsResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.category) queryParams.append('category', params.category);
      if (params.subCategory) queryParams.append('subCategory', params.subCategory);
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${API.PRODUCTS.GET_ALL_PRODUCTS}?${queryParams.toString()}`;
      const response = await customAxios.get(url);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<ApiProduct> {
    try {
      const url = API.PRODUCTS.GET_PRODUCT_BY_ID.replace(':id', id);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async getProductsByCategory(category: string): Promise<ApiProductsResponse> {
    try {
      const url = API.PRODUCTS.GET_PRODUCT_BY_CATEGORY.replace(':category', category);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  async getProductsBySubCategory(subCategory: string): Promise<ApiProductsResponse> {
    try {
      const url = API.PRODUCTS.GET_PRODUCT_BY_SUB_CATEGORY.replace(':subCategory', subCategory);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by sub-category:', error);
      throw error;
    }
  }
};
