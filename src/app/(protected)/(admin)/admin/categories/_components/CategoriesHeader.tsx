'use client';

import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoriesHeaderProps {
  onAddCategory?: () => void;
}

export default function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <FolderOpen className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Categories</h1>
            <p className="text-gray-600">Manage product categories and organization</p>
          </div>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={onAddCategory}
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </Button>
      </div>
    </div>
  );
}
