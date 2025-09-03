export interface Product {
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
  // Computed fields for display purposes
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
}

export interface SortOption {
  id: string;
  name: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}
