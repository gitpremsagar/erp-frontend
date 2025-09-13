'use client';

import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StocksFilterAndActionsProps {
  onCategoryFilter: (category: string) => void;
  onTagFilter: (selectedTags: string[]) => void;
  onStockLevelFilter: (stockLevel: string) => void;
  categories?: Array<{ id: string; name: string }>;
  productTags?: Array<{ id: string; name: string }>;
}

export default function StocksFilterAndActions({
  onCategoryFilter,
  onTagFilter,
  onStockLevelFilter,
  categories = [],
  productTags = []
}: StocksFilterAndActionsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStockLevel, setSelectedStockLevel] = useState('all');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryFilter(value);
  };

  const handleStockLevelChange = (value: string) => {
    setSelectedStockLevel(value);
    onStockLevelFilter(value);
  };

  const handleTagToggle = (tagId: string) => {
    const isSelected = selectedTags.includes(tagId);
    let newSelectedTags: string[];
    
    if (isSelected) {
      newSelectedTags = selectedTags.filter(id => id !== tagId);
    } else {
      newSelectedTags = [...selectedTags, tagId];
    }
    
    setSelectedTags(newSelectedTags);
    onTagFilter(newSelectedTags);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSelectedStockLevel('all');
    onCategoryFilter('all');
    onTagFilter([]);
    onStockLevelFilter('all');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col gap-6">
        {/* Filter Section Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Stock</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-gray-600 hover:text-gray-800"
          >
            Clear All
          </Button>
        </div>
        
        {/* Category and Stock Level Filters */}
        <div className="flex gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Stock Level</label>
            <Select value={selectedStockLevel} onValueChange={handleStockLevelChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Stock Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock Levels</SelectItem>
                <SelectItem value="low">Low Stock (≤ 10)</SelectItem>
                <SelectItem value="medium">Medium Stock (11-50)</SelectItem>
                <SelectItem value="high">High Stock (50+)</SelectItem>
                <SelectItem value="out">Out of Stock (0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tag Filters */}
        {productTags.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">Filter by Tags:</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {productTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`p-2 border rounded-md cursor-pointer transition-colors text-center ${
                    selectedTags.includes(tag.id)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleTagToggle(tag.id)}
                >
                  <span className="text-sm">{tag.name}</span>
                </div>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <div className="text-sm text-gray-600">
                Selected tags: {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Apply Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Stock</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
