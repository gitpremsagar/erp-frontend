'use client';

import Header from '@/components/home/Header';
import {
  ProductsHeader,
  ProductsFilters,
  ProductsGrid,
  ProductsFeatures,
  sortOptions
} from './_components';
import { useProducts } from '@/hooks/products';

export default function ProductsPage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortedProducts,
    totalProducts,
    loading,
    error,
    categories
  } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Products Header */}
      <ProductsHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Filters and Sort */}
      <ProductsFilters
        categories={categories}
        sortOptions={sortOptions}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsGrid 
          products={sortedProducts}
          totalProducts={totalProducts}
          loading={loading}
          error={error}
        />
      </div>

      {/* Features Section */}
      <ProductsFeatures />
    </div>
  );
}
