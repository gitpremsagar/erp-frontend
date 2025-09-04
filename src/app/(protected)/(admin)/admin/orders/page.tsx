'use client';

import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import OrdersHeader from "./_components/OrdersHeader";
import OrdersStats from "./_components/OrdersStats";
import OrdersSearchAndActions from "./_components/OrdersSearchAndActions";
import OrdersTableNew from "./_components/OrdersTableNew";
import { useOrders } from "@/lib/hooks/useOrders";
import { toast } from "sonner";

export default function OrdersPage() {
  const { 
    orders, 
    loading, 
    error, 
    pagination, 
    updateOrderStatus, 
    deleteOrder,
    refreshOrders 
  } = useOrders();

  const handleUpdateStatus = async (orderId: string, status: 'PENDING' | 'MODIFYING' | 'PACKING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED') => {
    alert("Updating status!");
    return;

    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    alert("Deleting order!");
    return;

    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <div className="text-red-600 text-lg font-medium mb-4">
                  Error loading orders
                </div>
                <div className="text-gray-600 mb-4">{error}</div>
                <button
                  onClick={refreshOrders}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <OrdersHeader />
            <OrdersStats />
            <OrdersSearchAndActions />
            <OrdersTableNew 
              orders={orders} 
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
