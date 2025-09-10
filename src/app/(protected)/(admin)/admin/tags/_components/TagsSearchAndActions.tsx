'use client';

import { useState } from 'react';
import { Search, Filter, Download, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TagsSearchAndActionsProps {
  onSearch: (searchTerm: string) => void;
  onAddTag?: () => void;
}

export default function TagsSearchAndActions({
  onSearch,
  onAddTag
}: TagsSearchAndActionsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tags by name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button 
            size="sm" 
            className="flex items-center space-x-2"
            onClick={onAddTag}
          >
            <Plus className="h-4 w-4" />
            <span>Add Tag</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
