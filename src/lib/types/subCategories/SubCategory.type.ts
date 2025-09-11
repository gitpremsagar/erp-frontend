export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoriesResponse {
  subCategories: SubCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetSubCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateSubCategoryData {
  name: string;
  description?: string;
  categoryId: string;
}

export interface UpdateSubCategoryData {
  name: string;
  description?: string;
  categoryId: string;
}
