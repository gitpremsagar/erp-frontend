'use client';

import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductsFilterAndActionsProps {
  onCategoryFilter: (category: string) => void;
  categories?: Array<{ id: string; name: string }>;
}

export default function ProductsFilterAndActions({
  onCategoryFilter,
  categories = [],
}: ProductsFilterAndActionsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryFilter(value);
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
