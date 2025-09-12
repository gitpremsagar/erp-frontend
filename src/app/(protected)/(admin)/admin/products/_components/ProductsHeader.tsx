'use client';

import { Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProductsHeader() {
  const router = useRouter();

  const handleAddProduct = () => {
    router.push('/admin/products/add-new-product');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory and catalog</p>
          </div>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={handleAddProduct}
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>
    </div>
  );
}
