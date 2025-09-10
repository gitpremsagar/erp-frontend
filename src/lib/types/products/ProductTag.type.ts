export interface ProductTag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTagsResponse {
  productTags: ProductTag[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetProductTagsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateProductTagData {
  name: string;
}

export interface UpdateProductTagData {
  name: string;
}
