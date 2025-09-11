'use client';

import { Tag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TagsHeaderProps {
  onAddTag?: () => void;
}

export default function TagsHeader({ onAddTag }: TagsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Tag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Tags</h1>
            <p className="text-gray-600">Manage product tags and categorization</p>
          </div>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={onAddTag}
        >
          <Plus className="h-4 w-4" />
          <span>Add Tag</span>
        </Button>
      </div>
    </div>
  );
}
