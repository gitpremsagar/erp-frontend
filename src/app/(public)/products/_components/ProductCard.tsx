'use client';

import { Star, ShoppingCart, Heart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-400/50 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          <Package className="w-16 h-16 text-primary" />
        </div>
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.mrp.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.mrp) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {product.inStock ? (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              In Stock
            </span>
          ) : (
            <span className="text-sm text-red-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Out of Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
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
