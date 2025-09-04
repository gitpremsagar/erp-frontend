import { API } from '../constants';

export interface OrderItemProduct {
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
}

export interface OrderItemCustomer {
  id: string;
  email: string;
  phone: string;
  name: string;
  password: string;
  privilegeId: string | null;
  aadharNumber: number | null;
  pan: string | null;
  gstNumber: string | null;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemOrder {
  id: string;
  customeOrderId: string;
  status: 'PENDING' | 'MODIFYING' | 'PACKING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  vehicleId: string | null;
  deliveryAddressId: string | null;
  originalOrderId: string | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  deliveryDate: string;
  orderCompleted: boolean;
  customerId: string;
  Order: OrderItemOrder;
  Product: OrderItemProduct;
  Customer: OrderItemCustomer;
}

export interface OrderItemsResponse {
  orderItems: OrderItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface OrderItemsQueryParams {
  orderId: string;
  page?: number;
  limit?: number;
}

class OrderItemServices {
  async getOrderItemsByOrderId(params: OrderItemsQueryParams): Promise<OrderItemsResponse> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('orderId', params.orderId);
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await fetch(`${API.ORDER_ITEMS.GET_ORDER_ITEMS_BY_ORDER_ID}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrderItemsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order items:', error);
      throw error;
    }
  }
}

export const orderItemServices = new OrderItemServices();
