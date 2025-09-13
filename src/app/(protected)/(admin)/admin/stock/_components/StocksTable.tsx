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
import { ArrowUpDown, Package, Edit, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StockAlert from './StockAlert';

interface StocksTableProps {
  data: Product[];
  onUpdateStock: (product: Product) => void;
}

export default function StocksTable({ data, onUpdateStock }: StocksTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const router = useRouter();
  // Use data directly since we're removing category filtering
  const filteredData = data;

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
            PRODUCT
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
          </button>
        ),
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                title="Edit product"
              >
                <Pencil className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
              <div>
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-500">{product.productCode}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.Stock[0]?.stockQuantity || 0,
        id: 'stockQuantity',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            TOTAL STOCK
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
        accessorKey: 'ProductTagRelation',
        header: 'TAGS',
        cell: ({ row }) => {
          const tags = row.original.ProductTagRelation || [];
          if (tags.length === 0) {
            return (
              <span className="text-sm text-gray-400 italic">No tags</span>
            );
          }
          return (
            <div className="flex flex-wrap gap-1">
              {tags.map((tagRelation) => (
                <span
                  key={tagRelation.id}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tagRelation.ProductTag.name}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: 'stockAlert',
        header: 'STOCK ALERT',
        cell: ({ row }) => (
          <StockAlert product={row.original} />
        ),
      },
      {
        id: 'actions',
        header: 'ACTIONS',
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
    [onUpdateStock, router]
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


