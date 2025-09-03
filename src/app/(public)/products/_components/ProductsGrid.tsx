'use client';

import { Package } from 'lucide-react';
import ProductCard from './ProductCard';

import { Product } from './types';

interface ProductsGridProps {
  products: Product[];
  totalProducts: number;
}

export default function ProductsGrid({ products, totalProducts }: ProductsGridProps) {
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
