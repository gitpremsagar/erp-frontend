import React from 'react';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { ApiProduct } from '@/lib/types/products/ApiProductsResponse.type';

interface StockAlertProps {
  product: ApiProduct;
}

export default function StockAlert({ product }: StockAlertProps) {
  const { stock, lowStockLimit, overStockLimit } = product;
  
  // Determine stock status and styling
  let icon = <Package className="w-4 h-4" />;
  let bgColor = 'bg-green-100';
  let textColor = 'text-green-800';
  let borderColor = 'border-green-200';
  let message = 'In Stock';
  
  if (stock <= lowStockLimit) {
    status = 'low';
    icon = <AlertTriangle className="w-4 h-4" />;
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    borderColor = 'border-red-200';
    message = product.lowStockAlertMessage || 'Low Stock Alert';
  } else if (stock >= overStockLimit) {
    status = 'over';
    icon = <TrendingUp className="w-4 h-4" />;
    bgColor = 'bg-amber-100';
    textColor = 'text-amber-800';
    borderColor = 'border-amber-200';
    message = product.overStockAlertMessage || 'Over Stock Alert';
  } else {
    message = product.inStockAlertMessage || 'In Stock';
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${bgColor} ${borderColor}`}>
      <span className={textColor}>
        {icon}
      </span>
      <span className={`text-xs font-medium ${textColor}`}>
        {message}
      </span>
    </div>
  );
}
