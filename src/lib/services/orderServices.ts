import { customAxios } from '../api/custom-axios-request';
import { API } from '../constants';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  deliveryDate: string | null;
  orderCompleted: boolean;
  customerId: string;
  Product: {
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
  };
  Customer: {
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
  };
}

export interface Order {
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
  customer: {
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
  };
  vehicle: {
    id: string;
    vehicleName: string;
    vehicleNumber: string;
    vehicleType: string;
    capacity: number;
    createdAt: string;
    updatedAt: string;
  } | null;
  deliveryAddress: {
    id: string;
    userId: string;
    default: boolean;
    address: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  OrderItem: OrderItem[];
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface OrdersQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  customerId?: string;
  startDate?: string;
  endDate?: string;
}

class OrderServices {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  async getOrders(params: OrdersQueryParams = {}): Promise<OrdersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.customerId) queryParams.append('customerId', params.customerId);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);

      console.log("Fetching orders with params:", `${API.ORDERS.GET_ALL_ORDERS}?${queryParams.toString()}`);

      const response = await fetch(`${API.ORDERS.GET_ALL_ORDERS}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Order = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Order = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}

export const orderServices = new OrderServices();
