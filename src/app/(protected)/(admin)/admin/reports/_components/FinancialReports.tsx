import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, TrendingDown, Download, PieChart, BarChart3 } from 'lucide-react';

const financialData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000, margin: 28.9 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000, margin: 32.7 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000, margin: 31.3 },
    { month: 'Apr', revenue: 61000, expenses: 42000, profit: 19000, margin: 31.1 },
    { month: 'May', revenue: 55000, expenses: 38000, profit: 17000, margin: 30.9 },
    { month: 'Jun', revenue: 67000, expenses: 45000, profit: 22000, margin: 32.8 },
];

const expenseCategories = [
    { category: 'Inventory', amount: 25000, percentage: 35.7 },
    { category: 'Marketing', amount: 15000, percentage: 21.4 },
    { category: 'Operations', amount: 12000, percentage: 17.1 },
    { category: 'Personnel', amount: 10000, percentage: 14.3 },
    { category: 'Technology', amount: 8000, percentage: 11.4 },
];

const profitMetrics = [
    { metric: 'Gross Profit', value: 124563, change: 12.5, trend: 'up' },
    { metric: 'Net Profit', value: 89000, change: 15.2, trend: 'up' },
    { metric: 'Profit Margin', value: 31.2, change: 2.1, trend: 'up' },
    { metric: 'Operating Expenses', value: 70000, change: -5.8, trend: 'down' },
];

export default function FinancialReports() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Financial Analytics</h3>
                </div>
                <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {profitMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-600">{metric.metric}</h4>
                            <div className="flex items-center">
                                {metric.trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-500" />
                                )}
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {metric.metric.includes('Margin') ? `${metric.value}%` : `₹${metric.value.toLocaleString()}`}
                        </p>
                        <p className={`text-sm font-medium ${
                            metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {metric.change > 0 ? '+' : ''}{metric.change}% vs last month
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Financial Trend */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Monthly Financial Performance</h4>
                    <div className="space-y-4">
                        {financialData.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-gray-900">{item.month}</h5>
                                    <span className="text-sm text-gray-600">{item.margin}% margin</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Revenue</p>
                                        <p className="font-medium text-green-600">₹{item.revenue.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Expenses</p>
                                        <p className="font-medium text-red-600">₹{item.expenses.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Profit</p>
                                        <p className="font-medium text-blue-600">₹{item.profit.toLocaleString()}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full" 
                                        style={{ width: `${(item.revenue / 70000) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Expense Breakdown</h4>
                    <div className="space-y-4">
                        {expenseCategories.map((expense, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                                    <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-medium text-gray-900">{expense.category}</h5>
                                        <span className="text-sm font-medium text-gray-900">₹{expense.amount.toLocaleString()}</span>
                                    </div>
                                
                                <div className="flex items-center space-x-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-red-600 h-2 rounded-full" 
                                            style={{ width: `${expense.percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600">{expense.percentage}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">Financial Summary</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-blue-600">Total Revenue</p>
                                <p className="font-medium text-blue-900">₹328,000</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Total Expenses</p>
                                <p className="font-medium text-blue-900">₹225,000</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Net Profit</p>
                                <p className="font-medium text-blue-900">₹103,000</p>
                            </div>
                            <div>
                                <p className="text-blue-600">Profit Margin</p>
                                <p className="font-medium text-blue-900">31.4%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h5 className="font-medium text-green-900">Revenue Growth</h5>
                    </div>
                    <p className="text-2xl font-bold text-green-900">+12.5%</p>
                    <p className="text-sm text-green-600">vs last quarter</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <PieChart className="w-5 h-5 text-blue-600" />
                        <h5 className="font-medium text-blue-900">Cost Efficiency</h5>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">68.6%</p>
                    <p className="text-sm text-blue-600">Revenue to cost ratio</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <h5 className="font-medium text-purple-900">Cash Flow</h5>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">₹45,200</p>
                    <p className="text-sm text-purple-600">Positive cash flow</p>
                </div>
            </div>
        </Card>
    );
}
