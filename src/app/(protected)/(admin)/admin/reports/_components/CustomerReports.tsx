import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Star, Download, TrendingUp, TrendingDown } from 'lucide-react';

const customerData = [
    { segment: 'New Customers', count: 234, growth: 15.6, value: 45600 },
    { segment: 'Returning Customers', count: 567, growth: 8.2, value: 89000 },
    { segment: 'VIP Customers', count: 89, growth: 23.1, value: 67000 },
    { segment: 'Inactive Customers', count: 123, growth: -5.2, value: 0 },
];

const topCustomers = [
    { name: 'John Smith', email: 'john@example.com', orders: 45, totalSpent: 12500, lastOrder: '2 days ago' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', orders: 38, totalSpent: 9800, lastOrder: '1 week ago' },
    { name: 'Mike Wilson', email: 'mike@example.com', orders: 32, totalSpent: 8700, lastOrder: '3 days ago' },
    { name: 'Emily Davis', email: 'emily@example.com', orders: 29, totalSpent: 7200, lastOrder: '5 days ago' },
    { name: 'David Brown', email: 'david@example.com', orders: 26, totalSpent: 6800, lastOrder: '1 week ago' },
];

const customerDemographics = [
    { age: '18-25', percentage: 25, count: 234 },
    { age: '26-35', percentage: 35, count: 328 },
    { age: '36-45', percentage: 22, count: 206 },
    { age: '46-55', percentage: 12, count: 112 },
    { age: '55+', percentage: 6, count: 56 },
];

export default function CustomerReports() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Customer Analytics</h3>
                </div>
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Segments */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Customer Segments</h4>
                    <div className="space-y-4">
                        {customerData.map((segment, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-gray-900">{segment.segment}</h5>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">₹{segment.value.toLocaleString()}</span>
                                        <div className="flex items-center">
                                            {segment.growth > 0 ? (
                                                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                                            )}
                                            <span className={`text-xs font-medium ${
                                                segment.growth > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {segment.growth > 0 ? '+' : ''}{segment.growth}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">{segment.count}</span>
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-purple-600 h-2 rounded-full" 
                                            style={{ width: `${(segment.count / 600) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Customers */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Top Customers</h4>
                    <div className="space-y-3">
                        {topCustomers.map((customer, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                        <p className="text-xs text-gray-500">{customer.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">₹{customer.totalSpent.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{customer.orders} orders</p>
                                    <p className="text-xs text-gray-400">{customer.lastOrder}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Demographics */}
            <div className="mt-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">Customer Demographics</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {customerDemographics.map((demo, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-lg font-bold text-purple-600">{demo.percentage}%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{demo.age}</p>
                            <p className="text-xs text-gray-500">{demo.count} customers</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customer Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <UserPlus className="w-5 h-5 text-blue-600" />
                        <h5 className="font-medium text-blue-900">Customer Acquisition</h5>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">234</p>
                    <p className="text-sm text-blue-600">New customers this month</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <Star className="w-5 h-5 text-green-600" />
                        <h5 className="font-medium text-green-900">Customer Satisfaction</h5>
                    </div>
                    <p className="text-2xl font-bold text-green-900">4.8/5</p>
                    <p className="text-sm text-green-600">Average rating</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        <h5 className="font-medium text-orange-900">Customer Retention</h5>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">87%</p>
                    <p className="text-sm text-orange-600">Retention rate</p>
                </div>
            </div>
        </Card>
    );
}
