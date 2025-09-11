'use client';

import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductsSearchAndActionsProps {
  onCategoryFilter: (category: string) => void;
  onSubCategoryFilter: (subCategory: string) => void;
  categories?: Array<{ id: string; name: string }>;
  subCategories?: Array<{ id: string; name: string }>;
}

export default function ProductsSearchAndActions({
  onCategoryFilter,
  onSubCategoryFilter,
  categories = [],
  subCategories = []
}: ProductsSearchAndActionsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubCategory('all'); // Reset subcategory when category changes
    onCategoryFilter(value);
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
    onSubCategoryFilter(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters */}
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

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button size="sm" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
