import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import CustomersHeader from "./_components/CustomersHeader";
import CustomersStats from "./_components/CustomersStats";
import CustomersSearchAndActions from "./_components/CustomersSearchAndActions";
import CustomersTable from "./_components/CustomersTable";
import { customersData } from "./_components/mockData";

export default function CustomersPage() {
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
            <CustomersTable customers={customersData} />
          </div>
        </div>
      </div>
    </div>
  );
}
