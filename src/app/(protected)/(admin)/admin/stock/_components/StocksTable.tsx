'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ProductRow } from './mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, MoreHorizontal, Package, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface StocksTableProps {
  data: ProductRow[];
}

export default function StocksTable({ data }: StocksTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<ProductRow>[]>(
    () => [
      {
        accessorKey: 'mrp',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {/* MRP */}
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
          const p = row.original;
          return (
            <div className="flex items-center gap-3">
              {/* Product Image */}
              {/* <Image src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover"
                width={40}
                height={40}
              /> */}
              <div>
                {/* Product Name */}
                <div className="text-sm font-medium text-gray-900">{p.name}</div>
                {/* Product Code */}
                <div className="text-xs text-gray-500">{p.productCode}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
          <div className="text-sm text-gray-900">
            {/* Category */}
            {row.original.category} / {row.original.group}
          </div>
        ),
      },
      
      {
        accessorKey: 'quantity',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >

            Quantity
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
          </button>
        ),
        cell: ({ row }) => {
          {/* Quantity */ }
          const qty = row.original.quantity;
          const low = qty < 50;
          return (
            <div className="flex items-center gap-2">
              {low ? (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              ) : (
                <Package className="w-4 h-4 text-gray-400" />
              )}
              <span className={`text-sm ${low ? 'text-amber-700 font-medium' : 'text-gray-900'}`}>{qty}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'expiryDate',
        header: 'Expiry',
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-700">{new Date(String(getValue())).toLocaleDateString()}</span>
        ),
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <div className="text-right">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-3">
        <Input
          placeholder="Search products..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
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
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}


