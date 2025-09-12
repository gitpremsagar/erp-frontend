import { customAxios } from '../api/custom-axios-request';
import { API } from '../constants';
import { Product, ProductsResponse, GetProductsParams, ProductDetailResponse } from '@/lib/types/products/Product.type';

export const productServices = {
  async getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
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

  async getProductById(id: string): Promise<ProductDetailResponse> {
    try {
      const url = API.PRODUCTS.GET_PRODUCT_BY_ID.replace(':id', id);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    try {
      const url = API.PRODUCTS.GET_PRODUCT_BY_CATEGORY.replace(':category', category);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  async getProductsBySubCategory(subCategory: string): Promise<ProductsResponse> {
    try {
      const url = API.PRODUCTS.GET_PRODUCT_BY_SUB_CATEGORY.replace(':subCategory', subCategory);
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by sub-category:', error);
      throw error;
    }
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    try {
      const response = await customAxios.post(API.PRODUCTS.CREATE_PRODUCT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    try {
      const url = API.PRODUCTS.UPDATE_PRODUCT.replace(':id', id);
      const response = await customAxios.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const url = API.PRODUCTS.DELETE_PRODUCT.replace(':id', id);
      await customAxios.delete(url);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};
