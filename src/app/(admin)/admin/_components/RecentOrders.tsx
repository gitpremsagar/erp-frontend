import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function RecentOrders() {
    const orders = [
        { id: 1001, product: "Haldiram Namkeen Mix", amount: "₹450", time: "2 hours ago" },
        { id: 1002, product: "Haldiram Sweets", amount: "₹320", time: "4 hours ago" },
        { id: 1003, product: "Haldiram Snacks", amount: "₹280", time: "6 hours ago" },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <ShoppingCart className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Order #{order.id}</p>
                                    <p className="text-sm text-gray-600">{order.product}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-900">{order.amount}</p>
                                <p className="text-sm text-gray-600">{order.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
