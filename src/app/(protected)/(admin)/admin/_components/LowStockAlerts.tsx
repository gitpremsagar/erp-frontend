import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

export default function LowStockAlerts() {
    const lowStockItems = [
        { name: "Haldiram Sweets", stock: 5 },
        { name: "Haldiram Namkeen", stock: 3 },
        { name: "Haldiram Snacks", stock: 7 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Products that need restocking</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {lowStockItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-full bg-red-100">
                                    <Package className="h-4 w-4 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-red-600">Only {item.stock} units left</p>
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
    );
}
