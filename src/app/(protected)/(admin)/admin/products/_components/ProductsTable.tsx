'use client';

import { useState } from 'react';
import { Edit, Eye, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApiProduct } from '@/lib/types/products/ApiProductsResponse.type';

interface ProductsTableProps {
  data: ApiProduct[];
  onUpdateProduct: (product: ApiProduct) => void;
}

const getStockStatus = (product: ApiProduct) => {
  if (product.stock <= product.lowStockLimit) {
    return {
      status: 'Low Stock',
      color: 'bg-red-100 text-red-800',
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />
    };
  } else if (product.stock >= product.overStockLimit) {
    return {
      status: 'Over Stock',
      color: 'bg-orange-100 text-orange-800',
      icon: <Package className="w-4 h-4 text-orange-500" />
    };
  } else {
    return {
      status: 'In Stock',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    };
  }
};

const getExpiryStatus = (product: ApiProduct) => {
  const expiryDate = new Date(product.expiryDate);
  const today = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry <= product.expiryAlertDays) {
    return {
      status: 'Expiring Soon',
      color: 'bg-red-100 text-red-800'
    };
  } else if (daysUntilExpiry <= 30) {
    return {
      status: 'Expires in 30 days',
      color: 'bg-yellow-100 text-yellow-800'
    };
  } else {
    return {
      status: 'Valid',
      color: 'bg-green-100 text-green-800'
    };
  }
};

export default function ProductsTable({ data, onUpdateProduct }: ProductsTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((product) => {
              const stockStatus = getStockStatus(product);
              const expiryStatus = getExpiryStatus(product);
              
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {product.imageUrl ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={product.imageUrl}
                            alt={product.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.productCode}
                        </div>
                        <div className="text-xs text-gray-400">
                          {product.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {stockStatus.icon}
                      <Badge className={stockStatus.color}>
                        {stockStatus.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {product.stock} units
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(product.mrp)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.grammage}g
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={expiryStatus.color}>
                      {expiryStatus.status}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(product.expiryDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.tags.slice(0, 2).join(', ')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.validity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      {selectedProduct === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button 
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                onUpdateProduct(product);
                                setSelectedProduct(null);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              Edit Product
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Eye className="w-4 h-4 mr-3" />
                              View Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
