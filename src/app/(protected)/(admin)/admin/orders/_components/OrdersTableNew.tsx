'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { MoreHorizontal, Eye, Edit, Trash2, Package, Truck, CheckCircle, Clock, X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/lib/services/orderServices';
import { toast } from 'sonner';

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus?: (orderId: string, status: Order['status']) => void;
  onDelete?: (orderId: string) => void;
}

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'PENDING':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'MODIFYING':
      return <Edit className="w-4 h-4 text-blue-500" />;
    case 'PACKING':
      return <Package className="w-4 h-4 text-purple-500" />;
    case 'SHIPPING':
      return <Truck className="w-4 h-4 text-indigo-500" />;
    case 'COMPLETED':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'CANCELLED':
      return <X className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: Order['status']) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  switch (status) {
    case 'PENDING':
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case 'MODIFYING':
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case 'PACKING':
      return `${baseClasses} bg-purple-100 text-purple-800`;
    case 'SHIPPING':
      return `${baseClasses} bg-indigo-100 text-indigo-800`;
    case 'COMPLETED':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'CANCELLED':
      return `${baseClasses} bg-red-100 text-red-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

export default function OrdersTableNew({ orders, onUpdateStatus, onDelete }: OrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'customeOrderId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            Order ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="space-y-1">
            <div 
              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
              onClick={() => router.push(`/admin/orders/${order.id}`)}
            >
              {order.customeOrderId}
            </div>
            <div className="text-xs text-gray-500">
              {order.OrderItem.length} item{order.OrderItem.length !== 1 ? 's' : ''}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'customer.name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const customer = row.original.customer;
        return (
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-900">
              {customer.name}
            </div>
            <div className="text-xs text-gray-500">
              {customer.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as Order['status'];
        return (
          <div className="flex items-center space-x-2">
            {getStatusIcon(status)}
            <Badge variant="secondary" className={getStatusBadge(status)}>
              {status}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'totalPrice',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('totalPrice'));
        return (
          <div className="text-sm font-medium text-gray-900">
            {formatCurrency(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: 'orderDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            Order Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('orderDate') as string;
        return (
          <div className="text-sm text-gray-900">
            {formatDate(date)}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            
            {selectedOrder === order.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      router.push(`/admin/orders/${order.id}`);
                      setSelectedOrder(null);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-3" />
                    View Details
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit className="w-4 h-4 mr-3" />
                    Edit Order
                  </button>
                  {onDelete && (
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        onDelete(order.id);
                        setSelectedOrder(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete Order
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      {/* Global Search */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all orders..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
      </div>
    </div>
  );
}
