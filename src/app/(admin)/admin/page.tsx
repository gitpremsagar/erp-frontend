import AdminHeader from "./_components/AdminHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings
} from 'lucide-react';

export default function BusinessManagementPage() {
    const stats = [
        {
            title: "Total Customers",
            value: "1,234",
            change: "+12%",
            icon: Users,
            color: "text-primary"
        },
        {
            title: "Products in Stock",
            value: "567",
            change: "+5%",
            icon: Package,
            color: "text-green-600"
        },
        {
            title: "Monthly Revenue",
            value: "₹2.5M",
            change: "+18%",
            icon: DollarSign,
            color: "text-blue-600"
        },
        {
            title: "Orders This Month",
            value: "89",
            change: "+8%",
            icon: ShoppingCart,
            color: "text-orange-600"
        }
    ];

    const quickActions = [
        {
            title: "Add New Product",
            description: "Add a new product to inventory",
            icon: Package,
            href: "/admin/inventory"
        },
        {
            title: "View Orders",
            description: "Check and manage orders",
            icon: ShoppingCart,
            href: "/admin/orders"
        },
        {
            title: "Analytics",
            description: "View business analytics",
            icon: BarChart3,
            href: "/admin/analytics"
        },
        {
            title: "Settings",
            description: "Manage account settings",
            icon: Settings,
            href: "/admin/settings"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-green-600">{stat.change} from last month</p>
                                    </div>
                                    <div className={`p-3 rounded-full bg-gray-100`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-full bg-primary/10">
                                            <action.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                                            <p className="text-sm text-gray-600">{action.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest orders from your customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((order) => (
                                    <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-full bg-primary/10">
                                                <ShoppingCart className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Order #{1000 + order}</p>
                                                <p className="text-sm text-gray-600">Haldiram Namkeen Mix</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">₹450</p>
                                            <p className="text-sm text-gray-600">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Low Stock Alerts</CardTitle>
                            <CardDescription>Products that need restocking</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-full bg-red-100">
                                                <Package className="h-4 w-4 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Haldiram Sweets</p>
                                                <p className="text-sm text-red-600">Only 5 units left</p>
                                            </div>
                                        </div>
                                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                                            Restock
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}