// StockRecordEntryReason enum based on Prisma schema
export enum StockRecordEntryReason {
  ARRIVAL_FROM_SUPPLIER = 'ARRIVAL_FROM_SUPPLIER',
  DELIVERED_TO_CUSTOMER = 'DELIVERED_TO_CUSTOMER',
  CORRECTION_BY_ADMIN = 'CORRECTION_BY_ADMIN'
}

// User interface (imported from existing types)
export interface User {
  id: string;
  name: string;
}

// Product interface (imported from existing types)
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
  // Add other product fields as needed
}

// Order interface (imported from existing types)
export interface Order {
  id: string;
  customeOrderId: string;
  status: string;
  totalPrice?: number | null;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  // Add other order fields as needed
}

// Detailed StockRecord interface based on Prisma schema
export interface DetailedStockRecord {
  id: string;
  productId: string;
  changeInStock: number;
  createdBy: string;
  createdAt: string;
  stockId: string;
  reason: StockRecordEntryReason;
  Product: Product;
  Stock: DetailedStock;
  User: User;
  Order: Order[];
}

// Detailed Stock interface based on Prisma schema
export interface DetailedStock {
  id: string;
  stockId: string;
  productId: string;
  manufacturingDate: string;
  arrivalDate: string;
  validityMonths: number;
  expiryDate: string;
  supplierName?: string | null;
  supplierId?: string | null;
  stockQuantity: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  product: Product;
  StockRecord: DetailedStockRecord[];
}

// Simplified Stock interface for basic usage
export interface Stock {
  id: string;
  stockId: string;
  stockQuantity: number;
}

// Simplified StockRecord interface for basic usage
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

// API Response types
export interface StocksResponse {
  stocks: DetailedStock[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface StockDetailResponse {
  stock: DetailedStock;
}

export interface StockRecordsResponse {
  stockRecords: DetailedStockRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Query parameters for stocks
export interface GetStocksParams {
  page?: number;
  limit?: number;
  productId?: string;
  supplierId?: string;
  isArchived?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  lowStock?: boolean;
  expiringSoon?: boolean;
}

export interface GetStockRecordsParams {
  page?: number;
  limit?: number;
  productId?: string;
  stockId?: string;
  reason?: StockRecordEntryReason;
  createdBy?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Create/Update stock types
export interface CreateStockData {
  stockId: string;
  productId: string;
  manufacturingDate: string;
  arrivalDate: string;
  validityMonths?: number;
  expiryDate: string;
  supplierName?: string;
  supplierId?: string;
  stockQuantity?: number;
}

export interface UpdateStockData {
  manufacturingDate?: string;
  arrivalDate?: string;
  validityMonths?: number;
  expiryDate?: string;
  supplierName?: string;
  supplierId?: string;
  stockQuantity?: number;
  isArchived?: boolean;
}

export interface CreateStockRecordData {
  productId: string;
  changeInStock: number;
  stockId: string;
  reason: StockRecordEntryReason;
}

// Stock analytics types
export interface StockAnalytics {
  totalStockValue: number;
  lowStockItems: number;
  expiringSoonItems: number;
  totalProducts: number;
  stockMovements: {
    incoming: number;
    outgoing: number;
    adjustments: number;
  };
}

export interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  currentStock: number;
  lowStockLimit: number;
  alertType: 'LOW_STOCK' | 'EXPIRING_SOON' | 'EXPIRED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
}
