'use client';

import { Search } from 'lucide-react';

interface ProductsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function ProductsHeader({ searchTerm, onSearchChange }: ProductsHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-600 mt-1">Discover our premium Haldiram product range</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
