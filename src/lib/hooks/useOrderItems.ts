import { useState, useEffect } from 'react';
import { orderItemServices, OrderItem, OrderItemsResponse } from '../services/orderItemServices';

export const useOrderItems = (orderId: string) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<OrderItemsResponse['pagination'] | null>(null);

  const fetchOrderItems = async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await orderItemServices.getOrderItemsByOrderId({
        orderId,
        page: 1,
        limit: 100 // Fetch all items for now
      });
      
      setOrderItems(response.orderItems);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [orderId]);

  const refreshOrderItems = () => {
    fetchOrderItems();
  };

  return {
    orderItems,
    loading,
    error,
    pagination,
    refreshOrderItems
  };
};
