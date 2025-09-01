import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import StocksHeader from "@/app/(protected)/(admin)/admin/stock/_components/StocksHeader";
import StocksTable from "@/app/(protected)/(admin)/admin/stock/_components/StocksTable";
import { productsData } from "@/app/(protected)/(admin)/admin/stock/_components/mockData";

export default function StockPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StocksHeader />
            <StocksTable data={productsData} />
          </div>
        </div>
      </div>
    </div>
  );
}


