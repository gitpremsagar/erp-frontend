import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import ReportsHeader from "./_components/ReportsHeader";
import ReportsOverview from "./_components/ReportsOverview";
import SalesReports from "./_components/SalesReports";
import InventoryReports from "./_components/InventoryReports";
import CustomerReports from "./_components/CustomerReports";
import FinancialReports from "./_components/FinancialReports";

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            
            
            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <AdminSidebar />
                
                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <ReportsHeader />
                        
                        <ReportsOverview />
                        
                        {/* Report Sections */}
                        <div className="space-y-8">
                            <SalesReports />
                            <InventoryReports />
                            <CustomerReports />
                            <FinancialReports />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
