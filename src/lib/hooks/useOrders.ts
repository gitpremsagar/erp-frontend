import { useState, useEffect } from 'react';
import { orderServices, Order, OrdersResponse, OrdersQueryParams } from '@/lib/services/orderServices';
import { toast } from 'sonner';

export const useOrders = (initialParams: OrdersQueryParams = {}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<OrdersResponse['pagination']>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [queryParams, setQueryParams] = useState<OrdersQueryParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });

  const fetchOrders = async (params: OrdersQueryParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedParams = { ...queryParams, ...params };
      const response = await orderServices.getOrders(mergedParams);
      
      setOrders(response.orders);
      setPagination(response.pagination);
      setQueryParams(mergedParams);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const updatedOrder = await orderServices.updateOrderStatus(orderId, status);
      
      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      toast.success(`Order status updated to ${status}`);
      return updatedOrder;
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status');
      throw err;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await orderServices.deleteOrder(orderId);
      
      // Remove the order from local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1
      }));
      
      toast.success('Order deleted successfully');
    } catch (err) {
      console.error('Error deleting order:', err);
      toast.error('Failed to delete order');
      throw err;
    }
  };

  const refreshOrders = () => {
    fetchOrders();
  };

  const goToPage = (page: number) => {
    fetchOrders({ page });
  };

  const changePageSize = (limit: number) => {
    fetchOrders({ page: 1, limit });
  };

  const filterByStatus = (status: string) => {
    fetchOrders({ page: 1, status });
  };

  const filterByDateRange = (startDate: string, endDate: string) => {
    fetchOrders({ page: 1, startDate, endDate });
  };

  const searchByCustomer = (customerId: string) => {
    fetchOrders({ page: 1, customerId });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    pagination,
    queryParams,
    fetchOrders,
    updateOrderStatus,
    deleteOrder,
    refreshOrders,
    goToPage,
    changePageSize,
    filterByStatus,
    filterByDateRange,
    searchByCustomer,
    setQueryParams
  };
};
