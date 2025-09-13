'use client';

import { useState, useMemo } from 'react';
import AdminSidebar from "../_components/AdminSidebar";
import { 
  ProductsHeader, 
  ProductsFilterAndActions, 
  ProductsTable 
} from "./_components";
import { useAdminProducts } from "@/hooks/products";
import { useCategories } from "@/hooks/categories";
import { useProductTags } from "@/hooks/productTags";

export default function ProductsPage() {
  const { products, loading, error, refreshProducts, deleteProduct } = useAdminProducts();
  const { categories } = useCategories();
  const { productTags } = useProductTags();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || 
        product.Category.id === selectedCategory;
      

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTagId => 
          product.ProductTagRelation.some(tagRelation => tagRelation.ProductTag.id === selectedTagId)
        );

      return matchesCategory && matchesTags;
    });
  }, [products, selectedCategory, selectedTags]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        // The hook will automatically refresh the data
      } catch (error) {
        console.error('Error deleting product:', error);
        
        // Check if the error response contains the specific message about existing orders
        const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
        if (errorMessage === "Cannot delete product as it is associated with existing orders") {
          alert('Cannot delete this product because it is associated with existing orders. Please remove the product from all orders before deleting.');
        } else {
          alert('Failed to delete product. Please try again.');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProductsHeader />
              <ProductsFilterAndActions
                onCategoryFilter={setSelectedCategory}
                onTagFilter={setSelectedTags}
                categories={categories}
                productTags={productTags}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProductsHeader />
              <ProductsFilterAndActions
                onCategoryFilter={setSelectedCategory}
                onTagFilter={setSelectedTags}
                categories={categories}
                productTags={productTags}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="text-red-600 text-lg font-medium mb-2">Error loading products</div>
                  <p className="text-gray-600">{error}</p>
                  <button 
                    onClick={() => refreshProducts()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductsHeader />
            <ProductsFilterAndActions
              onCategoryFilter={setSelectedCategory}
                onTagFilter={setSelectedTags}
              categories={categories}
              productTags={productTags}
            />
            <ProductsTable 
              products={filteredProducts} 
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
