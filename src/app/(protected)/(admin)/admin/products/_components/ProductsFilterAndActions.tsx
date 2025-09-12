'use client';

import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductsFilterAndActionsProps {
  onCategoryFilter: (category: string) => void;
  onSubCategoryFilter: (subCategory: string) => void;
  onTagFilter: (selectedTags: string[]) => void;
  categories?: Array<{ id: string; name: string }>;
  subCategories?: Array<{ id: string; name: string }>;
  productTags?: Array<{ id: string; name: string }>;
}

export default function ProductsFilterAndActions({
  onCategoryFilter,
  onSubCategoryFilter,
  onTagFilter,
  categories = [],
  subCategories = [],
  productTags = []
}: ProductsFilterAndActionsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubCategory('all'); // Reset subcategory when category changes
    onCategoryFilter(value);
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
    onSubCategoryFilter(value);
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col gap-6">
        {/* Category and Sub-Category Filters */}
        <div className="flex gap-3">
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

          <Select value={selectedSubCategory} onValueChange={handleSubCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Sub-Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sub-Categories</SelectItem>
              {subCategories.map((subCategory) => (
                <SelectItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tag Filters */}
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

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Apply Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
