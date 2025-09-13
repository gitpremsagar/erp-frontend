// Import types from other modules
import { Order } from '../orders/Order.type';
import { 
  DetailedStock, 
  DetailedStockRecord, 
  StockRecordEntryReason 
} from '../stock/Stock.type';

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


export interface User {
  id: string;
  name: string;
}


export interface Product {
  id: string;
  name: string;
  mrp: number;
  productCode: string;
  lowStockLimit: number;
  overStockLimit: number;
  categoryId: string;
  creatorId?: string;
  createdAt: string;
  updatedAt: string;
  description?: string | null;
  grammage: number;
  imageUrl: string;
  Category: Category;
  User?: User;
  ProductTagRelation: ProductTagRelation[];
  Stock: DetailedStock[];
  StockRecord?: DetailedStockRecord[];
}

// Enhanced types for detailed product response (GET_PRODUCT_BY_ID)
export interface DetailedCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}


export interface DetailedProductTag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedProductTagRelation {
  id: string;
  productId: string;
  productTagId: string;
  ProductTag: DetailedProductTag;
}

export interface ProductDetail {
  id: string;
  name: string;
  mrp: number;
  productCode: string;
  lowStockLimit: number;
  overStockLimit: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  grammage: number;
  imageUrl: string;
  Category: DetailedCategory;
  ProductTagRelation: DetailedProductTagRelation[];
  Stock: DetailedStock[];
  StockRecord: DetailedStockRecord[];
}

export interface ProductDetailResponse {
  product: ProductDetail;
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
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
