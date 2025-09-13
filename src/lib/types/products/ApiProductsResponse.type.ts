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
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
