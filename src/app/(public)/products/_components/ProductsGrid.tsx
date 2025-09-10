'use client';

import { Package, Loader2, AlertCircle } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types/products/Product.type';

// Extended Product type with computed fields for public display
interface ExtendedProduct extends Product {
  stock: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
}

interface ProductsGridProps {
  products: ExtendedProduct[];
  totalProducts: number;
  loading?: boolean;
  error?: string | null;
}

export default function ProductsGrid({ 
  products, 
  totalProducts, 
  loading = false, 
  error = null 
}: ProductsGridProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading products...</h3>
        <p className="text-gray-600">Please wait while we fetch the latest products.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-900 mb-2">Error loading products</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Results Count */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Showing {products.length} of {totalProducts} products
        </p>
      </div>
    </>
  );
}
