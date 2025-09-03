'use client';

import { Category, SortOption } from './types';

interface ProductsFiltersProps {
  categories: Category[];
  sortOptions: SortOption[];
  selectedCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export default function ProductsFilters({
  categories,
  sortOptions,
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange
}: ProductsFiltersProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
