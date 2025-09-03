export interface Product {
  id: number;
  name: string;
  category: string;
  mrp: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface SortOption {
  id: string;
  name: string;
}
