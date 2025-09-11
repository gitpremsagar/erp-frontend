'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  FilterFn,
} from '@tanstack/react-table';
import { Customer } from '@/lib/types/customers/Customer.type';
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Search, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

interface CustomersTableProps {
  customers: Customer[];
}

// Custom filter function for userType
const userTypeFilter: FilterFn<Customer> = (row, columnId, filterValue) => {
  if (filterValue === 'all') return true;
  const customer = row.original;
  return customer.userType === filterValue;
};

export default function CustomersTable({ customers }: CustomersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const getUserTypeBadge = (userType: string) => {
    const userTypeConfig = {
      CUSTOMER: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Customer' },
      ADMIN: { bg: 'bg-red-100', text: 'text-red-800', label: 'Admin' },
      MANAGER: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Manager' }
    };

    const config = userTypeConfig[userType as keyof typeof userTypeConfig] || { bg: 'bg-gray-100', text: 'text-gray-800', label: userType };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };



  const columns: ColumnDef<Customer>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-auto p-0 font-medium text-gray-500 uppercase tracking-wider text-xs"
            >
              Customer
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`}
                  alt={customer.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                <div className="text-sm text-gray-500">ID: {customer.id}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'email',
        header: 'Contact',
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <div>
              <div className="text-sm text-gray-900">{customer.email}</div>
              <div className="text-sm text-gray-500">{customer.phone}</div>
            </div>
          );
        },
      },
      {
        accessorKey: 'userType',
        id: 'userType',
        header: 'Role',
        filterFn: userTypeFilter,
        cell: ({ row }) => {
          const customer = row.original;
          return getUserTypeBadge(customer.userType);
        },
      },
      {
        accessorKey: 'aadharNumber',
        header: 'Aadhar Number',
        cell: ({ row }) => {
          const aadharNumber = row.getValue('aadharNumber') as number | null;
          return (
            <div className="text-sm text-gray-900">
              {aadharNumber ? aadharNumber.toString() : '-'}
            </div>
          );
        },
      },
      {
        accessorKey: 'gstNumber',
        header: 'GST Number',
        cell: ({ row }) => {
          const gstNumber = row.getValue('gstNumber') as string | null;
          return (
            <div className="text-sm text-gray-900">
              {gstNumber || '-'}
            </div>
          );
        },
      },
      {
        accessorKey: 'pan',
        header: 'PAN',
        cell: ({ row }) => {
          const pan = row.getValue('pan') as string | null;
          return (
            <div className="text-sm text-gray-900">
              {pan || '-'}
            </div>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="h-auto p-0 font-medium text-gray-500 uppercase tracking-wider text-xs"
            >
              Created Date
              {column.getIsSorted() === 'asc' ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          return <div className="text-sm text-gray-500">{formatDate(row.getValue('createdAt'))}</div>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              
              {selectedCustomer === customer.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Eye className="mr-3 h-4 w-4" />
                      View Details
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Edit className="mr-3 h-4 w-4" />
                      Edit Customer
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Mail className="mr-3 h-4 w-4" />
                      Send Email
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Phone className="mr-3 h-4 w-4" />
                      Call Customer
                    </button>
                    <hr className="my-1" />
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <Trash2 className="mr-3 h-4 w-4" />
                      Delete Customer
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                value={globalFilter ?? ''}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select
              value={(table.getColumn('userType')?.getFilterValue() as string) ?? 'all'}
              onValueChange={(value) => {
                table.getColumn('userType')?.setFilterValue(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
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

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}
              </span>{' '}
              of{' '}
              <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-l-md"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-r-md"
              >
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
