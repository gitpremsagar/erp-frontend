import HeaderInventory from "./_components/HeaderInventory";
import PageHeader from "./_components/PageHeader";
import InventoryStats from "./_components/InventoryStats";
import SearchAndActions from "./_components/SearchAndActions";
import InventoryTable from "./_components/InventoryTable";
import { inventoryItems } from "./_components/mockData";
import AdminSidebar from "../_components/AdminSidebar";
export default function StockPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderInventory />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader />
          <InventoryStats />
          <SearchAndActions />
          <InventoryTable inventoryItems={inventoryItems} />
        </div>
      </div>
    </div>
  );
}
