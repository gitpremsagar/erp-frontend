'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminSidebar from "../_components/AdminSidebar";
import { 
  CategoriesHeader, 
  CategoriesTable 
} from "./_components";
import { useCategories } from "@/hooks/categories";
import { Category } from "@/lib/types/categories/Category.type";
import { categoryServices } from "@/lib/services/categoryServices";
import { removeCategory } from "@/redux/slices/categoriesSlice";
import { AppDispatch } from "@/redux/store";

export default function CategoriesPage() {
  const { categories, isLoading, error, loadCategories } = useCategories();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryServices.deleteCategory(id);
        dispatch(removeCategory(id));
      } catch (error: any) {
        console.error('Error deleting category:', error);
        
        // Check if it's a 400 error with the specific message
        if (error?.response?.status === 400 && 
            error?.response?.data?.message === "Cannot delete category as it is associated with existing products") {
          alert('Cannot delete category as it is associated with existing products!');
        } else {
          alert('Failed to delete category. Please try again.');
        }
      }
    }
  };

  const handleAddCategory = () => {
    router.push('/admin/categories/add-new-category');
  };

  const handleEditCategory = (category: Category) => {
    // TODO: Implement edit category functionality
    console.log('Edit category:', category);
  };

  const handleViewCategory = (category: Category) => {
    // TODO: Implement view category functionality
    console.log('View category:', category);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                  </div>
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading categories</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    <button
                      onClick={loadCategories}
                      className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                    >
                      Try again
                    </button>
                  </div>
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
            <CategoriesHeader onAddCategory={handleAddCategory} />
            <CategoriesTable 
              categories={categories} 
              onDelete={handleDelete}
              onEdit={handleEditCategory}
              onView={handleViewCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
