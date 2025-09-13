// OrderStatus enum based on Prisma schema
export enum OrderStatus {
  PENDING = 'PENDING',
  MODIFYING = 'MODIFYING',
  PACKING = 'PACKING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED'
}

// User interface (imported from existing types)
export interface User {
  id: string;
  name: string;
}

// Vehicle interface (imported from existing types)
export interface Vehicle {
  id: string;
  name: string;
  // Add other vehicle fields as needed
}

// Product interface (imported from existing types)
export interface Product {
  id: string;
  name: string;
  mrp: number;
  productCode: string;
  // Add other product fields as needed
}

// Import StockRecord from stock types
import { DetailedStockRecord } from '../stock/Stock.type';

// DeliveryAddress interface based on Prisma schema
export interface DeliveryAddress {
  id: string;
  userId: string;
  default: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
  User: User;
  Order: Order[];
}

// OrderItem interface based on Prisma schema
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string | null;
  orderCompleted: boolean;
  Order: Order;
  Product: Product;
  customerId: string;
  Customer: User;
}

// Order interface based on Prisma schema
export interface Order {
  id: string;
  customeOrderId: string;
  status: OrderStatus;
  totalPrice?: number | null;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  customer: User;
  vehicleId?: string | null;
  vehicle?: Vehicle | null;
  deliveryAddressId?: string | null;
  deliveryAddress?: DeliveryAddress | null;
  originalOrderId?: string | null;
  stockRecordId?: string | null;
  OrderItem: OrderItem[];
  stockRecord?: DetailedStockRecord | null;
}

// OriginalOrderItem interface based on Prisma schema
export interface OriginalOrderItem {
  id: string;
  originalOrderId: string;
  productId: string;
  quantity: number;
  OriginalOrder: OriginalOrder;
}

// OriginalOrder interface based on Prisma schema
export interface OriginalOrder {
  id: string;
  originalOrderId: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  OriginalOrderItem: OriginalOrderItem[];
}

// API Response types
export interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface OrderDetailResponse {
  order: Order;
}

// Query parameters for orders
export interface GetOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  customerId?: string;
  vehicleId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}

// Create/Update order types
export interface CreateOrderData {
  customerId: string;
  vehicleId?: string;
  deliveryAddressId?: string;
  originalOrderId?: string;
  orderItems: CreateOrderItemData[];
}

export interface CreateOrderItemData {
  productId: string;
  quantity: number;
  deliveryDate?: string;
}

export interface UpdateOrderData {
  status?: OrderStatus;
  totalPrice?: number;
  vehicleId?: string;
  deliveryAddressId?: string;
}

export interface UpdateOrderItemData {
  quantity?: number;
  deliveryDate?: string;
  orderCompleted?: boolean;
}
