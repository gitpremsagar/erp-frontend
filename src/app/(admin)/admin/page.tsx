import AdminHeader from "./_components/AdminHeader";
import AdminSidebar from "./_components/AdminSidebar";
import DashboardHeader from "./_components/DashboardHeader";
import StatsGrid from "./_components/StatsGrid";
import QuickActionsGrid from "./_components/QuickActionsGrid";
import RecentOrders from "./_components/RecentOrders";
import LowStockAlerts from "./_components/LowStockAlerts";
import { stats, quickActions } from "./_components/dashboardData";

export default function BusinessManagementPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            
            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <AdminSidebar />
                
                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <DashboardHeader />
                        
                        <StatsGrid stats={stats} />
                        
                        <QuickActionsGrid actions={quickActions} />
                        
                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <RecentOrders />
                            <LowStockAlerts />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}