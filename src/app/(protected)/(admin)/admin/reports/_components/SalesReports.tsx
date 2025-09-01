import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Download, BarChart3 } from 'lucide-react';

const salesData = [
    { month: 'Jan', revenue: 45000, orders: 234, growth: 12.5 },
    { month: 'Feb', revenue: 52000, orders: 267, growth: 15.6 },
    { month: 'Mar', revenue: 48000, orders: 245, growth: -7.7 },
    { month: 'Apr', revenue: 61000, orders: 312, growth: 27.1 },
    { month: 'May', revenue: 55000, orders: 289, growth: -9.8 },
    { month: 'Jun', revenue: 67000, orders: 345, growth: 21.8 },
];

const topProducts = [
    { name: 'Laptop Pro X1', sales: 156, revenue: 23400, growth: 23.5 },
    { name: 'Wireless Headphones', sales: 134, revenue: 13400, growth: 18.2 },
    { name: 'Smartphone Galaxy', sales: 98, revenue: 19600, growth: -5.2 },
    { name: 'Tablet Air', sales: 87, revenue: 17400, growth: 31.7 },
    { name: 'Gaming Console', sales: 76, revenue: 22800, growth: 12.8 },
];

export default function SalesReports() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Sales Analytics</h3>
                </div>
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Trend Chart */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Monthly Sales Trend</h4>
                    <div className="space-y-4">
                        {salesData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 text-center">
                                        <div className="text-sm font-medium text-gray-900">{item.month}</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-600">Revenue</span>
                                            <span className="text-sm font-medium text-gray-900">₹{item.revenue.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(item.revenue / 70000) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {item.growth > 0 ? (
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                    )}
                                    <span className={`text-sm font-medium ${
                                        item.growth > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {item.growth > 0 ? '+' : ''}{item.growth}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Top Performing Products</h4>
                    <div className="space-y-3">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.sales} units sold</p>
                                    </div>
                                </div>
                                                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
                                    <div className="flex items-center space-x-1">
                                        {product.growth > 0 ? (
                                            <TrendingUp className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3 text-red-500" />
                                        )}
                                        <span className={`text-xs font-medium ${
                                            product.growth > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {product.growth > 0 ? '+' : ''}{product.growth}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
