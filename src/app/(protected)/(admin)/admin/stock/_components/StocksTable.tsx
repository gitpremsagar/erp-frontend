'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Product } from '@/lib/types/products/Product.type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Package, Edit } from 'lucide-react';
import StockAlert from './StockAlert';

interface StocksTableProps {
  data: Product[];
  onUpdateStock: (product: Product) => void;
}

export default function StocksTable({ data, onUpdateStock }: StocksTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [groupFilter, setGroupFilter] = React.useState<string>('all');

  // Get unique categories for filter
  const uniqueCategories = React.useMemo(() => {
    const categories = data.map(product => product.Category?.name).filter(Boolean);
    return Array.from(new Set(categories));
  }, [data]);

  // Filter data based on category selection
  const filteredData = React.useMemo(() => {
    if (groupFilter === 'all') return data;
    return data.filter(product => product.Category?.name === groupFilter);
  }, [data, groupFilter]);

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'mrp',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            MRP
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
          </button>
        ),
        cell: ({ getValue }) => (
          <span className="text-sm font-medium">₹{Number(getValue() as number).toLocaleString('en-IN')}</span>
        ),
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Product
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
          </button>
        ),
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center gap-3">
              <div>
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-500">{product.productCode}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'Category.name',
        header: 'Category',
        cell: ({ row }) => (
          <div className="text-sm text-gray-900">
            {row.original.Category?.name || 'N/A'}
          </div>
        ),
      },
      {
        accessorKey: 'Stock',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Stock
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
          </button>
        ),
        cell: ({ row }) => {
          const stock = row.original.Stock[0]?.stockQuantity || 0;
          return (
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">
                {stock}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'stockAlert',
        header: 'Stock Alert',
        cell: ({ row }) => (
          <StockAlert product={row.original} />
        ),
      },
      {
        accessorKey: 'grammage',
        header: 'Grammage',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{getValue() as number}g</span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-3"
              onClick={() => onUpdateStock(row.original)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Update Stock
            </Button>
          </div>
        ),
      },
    ],
    [onUpdateStock]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search products..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <Select value={groupFilter} onValueChange={setGroupFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-600">
          Total Products: {filteredData.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


