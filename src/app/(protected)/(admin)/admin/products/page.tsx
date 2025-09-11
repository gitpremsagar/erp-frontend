'use client';

import { useState, useMemo } from 'react';
import AdminSidebar from "../_components/AdminSidebar";
import { 
  ProductsHeader, 
  ProductsSearchAndActions, 
  ProductsTable 
} from "./_components";
import { useAdminProducts } from "@/hooks/products";

export default function ProductsPage() {
  const { products, loading, error, pagination, refreshProducts, deleteProduct } = useAdminProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');


  // Extract unique categories and subcategories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Map(products.map(p => [p.Category.id, p.Category])).values()
    );
    return uniqueCategories;
  }, [products]);

  const subCategories = useMemo(() => {
    const uniqueSubCategories = Array.from(
      new Map(products.map(p => [p.SubCategory.id, p.SubCategory])).values()
    );
    return uniqueSubCategories;
  }, [products]);

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || 
        product.Category.id === selectedCategory;
      
      const matchesSubCategory = selectedSubCategory === 'all' || 
        product.SubCategory.id === selectedSubCategory;

      return matchesCategory && matchesSubCategory;
    });
  }, [products, selectedCategory, selectedSubCategory]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        // The hook will automatically refresh the data
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
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
              <ProductsSearchAndActions
                onCategoryFilter={setSelectedCategory}
                onSubCategoryFilter={setSelectedSubCategory}
                categories={categories}
                subCategories={subCategories}
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
              <ProductsSearchAndActions
                onCategoryFilter={setSelectedCategory}
                onSubCategoryFilter={setSelectedSubCategory}
                categories={categories}
                subCategories={subCategories}
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
            <ProductsSearchAndActions
              onCategoryFilter={setSelectedCategory}
              onSubCategoryFilter={setSelectedSubCategory}
              categories={categories}
              subCategories={subCategories}
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
