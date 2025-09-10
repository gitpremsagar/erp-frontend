'use client';

import { Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface ProductsStatsProps {
  totalProducts?: number;
  lowStockProducts?: number;
  outOfStockProducts?: number;
  totalValue?: number;
}

export default function ProductsStats({ 
  totalProducts = 0, 
  lowStockProducts = 0, 
  outOfStockProducts = 0, 
  totalValue = 0 
}: ProductsStatsProps) {
  const stats = [
    {
      name: 'Total Products',
      value: totalProducts.toLocaleString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Low Stock',
      value: lowStockProducts.toLocaleString(),
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'Out of Stock',
      value: outOfStockProducts.toLocaleString(),
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      name: 'Total Value',
      value: `₹${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
