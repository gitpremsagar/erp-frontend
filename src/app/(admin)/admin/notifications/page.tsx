import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import NotificationsHeader from "./_components/NotificationsHeader";
import NotificationsList from "./_components/NotificationsList";
import NotificationsFilters from "./_components/NotificationsFilters";
import NotificationsStats from "./_components/NotificationsStats";

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            
            <div className="flex h-[calc(100vh-64px)]">
                {/* Sidebar */}
                <AdminSidebar />
                
                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <NotificationsHeader />
                        
                        <NotificationsStats />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                            {/* Filters Sidebar */}
                            <div className="lg:col-span-1">
                                <NotificationsFilters />
                            </div>
                            
                            {/* Notifications List */}
                            <div className="lg:col-span-3">
                                <NotificationsList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

