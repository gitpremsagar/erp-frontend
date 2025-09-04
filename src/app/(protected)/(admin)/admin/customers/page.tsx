'use client';

import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import CustomersHeader from "./_components/CustomersHeader";
import CustomersStats from "./_components/CustomersStats";
import CustomersSearchAndActions from "./_components/CustomersSearchAndActions";
import CustomersTable from "./_components/CustomersTable";
import { useCustomers } from "@/hooks/customers";

export default function CustomersPage() {
  const { customers, loading, error, pagination } = useCustomers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CustomersHeader />
              <CustomersStats />
              <CustomersSearchAndActions />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading customers...</p>
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CustomersHeader />
              <CustomersStats />
              <CustomersSearchAndActions />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="text-red-600 text-lg font-medium mb-2">Error loading customers</div>
                  <p className="text-gray-600">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CustomersHeader />
            <CustomersStats />
            <CustomersSearchAndActions />
            <CustomersTable customers={customers} />
          </div>
        </div>
      </div>
    </div>
  );
}
