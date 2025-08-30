import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Download } from 'lucide-react';

const inventoryData = [
    { category: 'Electronics', totalItems: 456, lowStock: 12, turnover: 85, value: 125000 },
    { category: 'Clothing', totalItems: 234, lowStock: 8, turnover: 92, value: 45000 },
    { category: 'Home & Garden', totalItems: 189, lowStock: 15, turnover: 67, value: 32000 },
    { category: 'Sports', totalItems: 145, lowStock: 6, turnover: 78, value: 28000 },
    { category: 'Books', totalItems: 567, lowStock: 23, turnover: 45, value: 15000 },
];

const lowStockItems = [
    { name: 'Laptop Pro X1', current: 3, min: 10, daysLeft: 2 },
    { name: 'Wireless Mouse', current: 5, min: 15, daysLeft: 4 },
    { name: 'USB Cable', current: 8, min: 20, daysLeft: 6 },
    { name: 'Monitor Stand', current: 2, min: 8, daysLeft: 1 },
    { name: 'Keyboard', current: 4, min: 12, daysLeft: 3 },
];

export default function InventoryReports() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Inventory Analytics</h3>
                </div>
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inventory by Category */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Inventory by Category</h4>
                    <div className="space-y-4">
                        {inventoryData.map((category, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-gray-900">{category.category}</h5>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">₹{category.value.toLocaleString()}</span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            {category.turnover}% turnover
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Total Items</p>
                                        <p className="font-medium text-gray-900">{category.totalItems}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Low Stock</p>
                                        <p className="font-medium text-red-600">{category.lowStock}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Turnover Rate</p>
                                        <div className="flex items-center">
                                            {category.turnover > 80 ? (
                                                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                                            )}
                                            <span className="font-medium text-gray-900">{category.turnover}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Low Stock Alerts</h4>
                    <div className="space-y-3">
                        {lowStockItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {item.current} of {item.min} remaining
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-red-600">
                                        {item.daysLeft} day{item.daysLeft !== 1 ? 's' : ''} left
                                    </p>
                                    <Button size="sm" variant="outline" className="mt-1">
                                        Reorder
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">Inventory Summary</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-blue-600">Total SKUs</p>
                                <p className="font-medium text-blue-900">1,591</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Low Stock Items</p>
                                <p className="font-medium text-red-600">23</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Out of Stock</p>
                                <p className="font-medium text-red-600">5</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Total Value</p>
                                <p className="font-medium text-blue-900">₹245,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
