'use client';

import { useState, useMemo } from 'react';
import AdminSidebar from "../_components/AdminSidebar";
import { 
  TagsHeader, 
  TagsStats, 
  TagsSearchAndActions, 
  TagsTable 
} from "./_components";
import { useProductTags } from "@/hooks/productTags";
import { ProductTag } from "@/lib/types/products/ProductTag.type";

export default function TagsPage() {
  const { productTags, loading, error, refreshProductTags, deleteProductTag } = useProductTags();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate stats from tags
  const stats = useMemo(() => {
    const totalTags = productTags.length;
    const recentlyCreated = productTags.filter(tag => {
      const createdAt = new Date(tag.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return createdAt >= sevenDaysAgo;
    }).length;
    
    // For now, we'll use mock data for most used and total products
    // In a real app, you'd get this from the API
    const mostUsed = 0; // This would come from API
    const totalProducts = 0; // This would come from API

    return {
      totalTags,
      recentlyCreated,
      mostUsed,
      totalProducts
    };
  }, [productTags]);

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    return productTags.filter(tag => {
      const matchesSearch = searchTerm === '' || 
        tag.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [productTags, searchTerm]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        await deleteProductTag(id);
        // The hook will automatically refresh the data
      } catch (error) {
        console.error('Error deleting tag:', error);
        alert('Failed to delete tag. Please try again.');
      }
    }
  };

  const handleAddTag = () => {
    // TODO: Implement add tag functionality
    console.log('Add tag clicked');
  };

  const handleEditTag = (tag: ProductTag) => {
    // TODO: Implement edit tag functionality
    console.log('Edit tag:', tag);
  };

  const handleViewTag = (tag: ProductTag) => {
    // TODO: Implement view tag functionality
    console.log('View tag:', tag);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <TagsHeader onAddTag={handleAddTag} />
              <TagsStats />
              <TagsSearchAndActions
                onSearch={setSearchTerm}
                onAddTag={handleAddTag}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading tags...</p>
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
              <TagsHeader onAddTag={handleAddTag} />
              <TagsStats />
              <TagsSearchAndActions
                onSearch={setSearchTerm}
                onAddTag={handleAddTag}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="text-red-600 text-lg font-medium mb-2">Error loading tags</div>
                  <p className="text-gray-600">{error}</p>
                  <button 
                    onClick={() => refreshProductTags()}
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
            <TagsHeader onAddTag={handleAddTag} />
            <TagsStats 
              totalTags={stats.totalTags}
              recentlyCreated={stats.recentlyCreated}
              mostUsed={stats.mostUsed}
              totalProducts={stats.totalProducts}
            />
            <TagsSearchAndActions
              onSearch={setSearchTerm}
              onAddTag={handleAddTag}
            />
            <TagsTable 
              tags={filteredTags} 
              onDelete={handleDelete}
              onEdit={handleEditTag}
              onView={handleViewTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
