'use client';

import { Heart, Package, Tag, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Product } from '@/lib/types/products/Product.type';

// Extended Product type with computed fields for public display
interface ExtendedProduct extends Product {
  stock: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
}

interface ProductCardProps {
  product: ExtendedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Product Badges */}
      <div className="relative p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            {product.isNew && (
              <Badge className="bg-green-500 text-white text-xs">
                New
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-primary text-white text-xs">
                Featured
              </Badge>
            )}
          </div>
          <button className="p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200">
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {product.Category?.name || 'Unknown Category'}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Code */}
        <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
          <Package className="w-3 h-3" />
          <span>Code: {product.productCode}</span>
        </div>

        {/* Weight Info */}
        <div className="flex items-center justify-center mb-3 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Weight className="w-4 h-4" />
            <span>{product.grammage}g</span>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Stock:</span>
            <Badge 
              className={`text-xs ${
                product.stock <= product.lowStockLimit 
                  ? 'bg-red-100 text-red-800' 
                  : product.stock >= product.overStockLimit 
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {product.stock} units
            </Badge>
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.mrp.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            disabled={!product.inStock}
          >
            Add
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            disabled={!product.inStock}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
