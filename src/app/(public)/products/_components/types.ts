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
  lowStockLimit?: number;
  overStockLimit?: number;
  lowStockAlertColor?: string;
  lowStockAlertMessage?: string;
  overStockAlertColor?: string;
  overStockAlertMessage?: string;
  inStockAlertColor?: string;
  inStockAlertMessage?: string;
  expiryAlertDays?: number;
  expiryAlertColor?: string;
  expiryAlertMessage?: string;
  tags?: string[];
  imageUrl: string;
  categoryId: string;
  groupId: string;
  subCategoryId: string;
  grammage: number;
  // Additional fields for display purposes
  category?: string;
  group?: string;
  subCategory?: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface SortOption {
  id: string;
  name: string;
}
