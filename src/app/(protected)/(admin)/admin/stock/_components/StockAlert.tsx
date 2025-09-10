import React from 'react';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { Product } from '@/lib/types/products/Product.type';

interface StockAlertProps {
  product: Product;
}

export default function StockAlert({ product }: StockAlertProps) {
  const stock = product.Stock[0]?.stockQuantity || 0;
  const { lowStockLimit, overStockLimit } = product;
  
  // Determine stock status and styling
  let icon = <Package className="w-4 h-4" />;
  let bgColor = 'bg-green-100';
  let textColor = 'text-green-800';
  let borderColor = 'border-green-200';
  let message = 'In Stock';
  
  if (stock <= lowStockLimit) {
    icon = <AlertTriangle className="w-4 h-4" />;
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    borderColor = 'border-red-200';
    message = 'Low Stock Alert';
  } else if (stock >= overStockLimit) {
    icon = <TrendingUp className="w-4 h-4" />;
    bgColor = 'bg-amber-100';
    textColor = 'text-amber-800';
    borderColor = 'border-amber-200';
    message = 'Over Stock Alert';
  } else {
    message = 'In Stock';
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
