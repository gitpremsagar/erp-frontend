import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';

const overviewData = [
    {
        title: "Total Revenue",
        value: "₹124,563.00",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "text-green-600",
        bgColor: "bg-green-100"
    },
    {
        title: "Total Orders",
        value: "1,234",
        change: "+8.2%",
        trend: "up",
        icon: ShoppingCart,
        color: "text-blue-600",
        bgColor: "bg-blue-100"
    },
    {
        title: "Active Customers",
        value: "892",
        change: "+15.3%",
        trend: "up",
        icon: Users,
        color: "text-purple-600",
        bgColor: "bg-purple-100"
    },
    {
        title: "Low Stock Items",
        value: "23",
        change: "-5.1%",
        trend: "down",
        icon: Package,
        color: "text-orange-600",
        bgColor: "bg-orange-100"
    }
];

export default function ReportsOverview() {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewData.map((item, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                                <div className="flex items-center mt-2">
                                    {item.trend === "up" ? (
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                    )}
                                    <span className={`text-sm font-medium ${
                                        item.trend === "up" ? "text-green-600" : "text-red-600"
                                    }`}>
                                        {item.change}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bgColor}`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
