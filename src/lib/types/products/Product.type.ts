export interface ProductTag {
  id: string;
  name: string;
}

export interface ProductTagRelation {
  id: string;
  productId: string;
  productTagId: string;
  ProductTag: ProductTag;
}

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Stock {
  id: string;
  stockId: string;
  stockQuantity: number;
}

export interface StockRecord {
  id: string;
  productId: string;
  previousQuantity: number;
  newQuantity: number;
  changeType: 'increase' | 'decrease' | 'adjustment';
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  mrp: number;
  productCode: string;
  lowStockLimit: number;
  overStockLimit: number;
  categoryId: string;
  subCategoryId: string;
  creatorId?: string;
  createdAt: string;
  updatedAt: string;
  description?: string | null;
  grammage: number;
  imageUrl: string;
  Category: Category;
  SubCategory: SubCategory;
  User?: User;
  ProductTagRelation: ProductTagRelation[];
  Stock: Stock[];
  StockRecord?: StockRecord[];
}

export interface ProductsResponse {
  products: Product[];
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
