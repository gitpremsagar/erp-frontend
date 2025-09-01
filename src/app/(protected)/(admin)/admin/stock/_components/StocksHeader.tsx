'use client';

import { PackageSearch } from 'lucide-react';

export default function StocksHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <PackageSearch className="w-6 h-6 text-blue-600" /> Stock
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage product inventory levels.
          </p>
        </div>
      </div>
    </div>
  );
}


