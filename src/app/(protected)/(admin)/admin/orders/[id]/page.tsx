'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
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
import { ArrowUpDown, Package, Calendar, User, DollarSign, Hash, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminSidebar from '../../_components/AdminSidebar';
import { useOrderItems } from '@/lib/hooks/useOrderItems';
import { OrderItem } from '@/lib/services/orderItemServices';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <Package className="w-4 h-4 text-yellow-500" />;
    case 'MODIFYING':
      return <Package className="w-4 h-4 text-blue-500" />;
    case 'PACKING':
      return <Package className="w-4 h-4 text-purple-500" />;
    case 'SHIPPING':
      return <Package className="w-4 h-4 text-indigo-500" />;
    case 'COMPLETED':
      return <Package className="w-4 h-4 text-green-500" />;
    case 'CANCELLED':
      return <Package className="w-4 h-4 text-red-500" />;
    default:
      return <Package className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
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

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { orderItems, loading, error, pagination, refreshOrderItems } = useOrderItems(orderId);
  const [refreshing, setRefreshing] = useState(false);
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshOrderItems();
      toast.success('Order details refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh order details');
    } finally {
      setRefreshing(false);
    }
  };

  const columns: ColumnDef<OrderItem>[] = [
    {
      accessorKey: 'Product.imageUrl',
      header: 'IMAGE',
      cell: ({ row }) => {
        const product = row.original.Product;
        return (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className="hidden w-full h-full flex items-center justify-center text-gray-400 text-xs">
              <Package className="w-6 h-6" />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'Product.name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            PRODUCT NAME
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const product = row.original.Product;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-900">{product.name}</span>
            <span className="text-sm text-gray-500">{product.productCode}</span>
            <span className="text-xs text-gray-400 line-clamp-2">{product.description}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'Product.Category.name',
      header: 'CATEGORY',
      cell: ({ row }) => {
        const category = row.original.Product.Category;
        const subCategory = row.original.Product.SubCategory;
        const group = row.original.Product.Group;
        return (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{category.name}</span>
            <span className="text-sm text-gray-500">{subCategory.name}</span>
            <span className="text-xs text-gray-400">{group.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            QUANTITY
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <Badge variant="secondary" className="font-medium">
            {row.original.quantity}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'Product.mrp',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            UNIT PRICE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const mrp = row.original.Product.mrp;
        const quantity = row.original.quantity;
        const totalPrice = mrp * quantity;
        
        return (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{formatCurrency(mrp)}</span>
            <span className="text-sm text-gray-500">Total: {formatCurrency(totalPrice)}</span>
            <span className="text-xs text-gray-400">Qty: {quantity}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'Product.stock',
      header: 'STOCK',
      cell: ({ row }) => {
        const stock = row.original.Product.stock;
        const lowStockLimit = row.original.Product.lowStockLimit;
        
        let stockColor = 'text-green-600';
        let stockVariant: "default" | "secondary" | "destructive" = "default";
        
        if (stock <= lowStockLimit) {
          stockColor = 'text-red-600';
          stockVariant = "destructive";
        } else if (stock <= lowStockLimit * 2) {
          stockColor = 'text-yellow-600';
          stockVariant = "secondary";
        }
        
        return (
          <div className="flex flex-col gap-1">
            <Badge variant={stockVariant} className="w-fit">
              {stock} units
            </Badge>
            <div className="text-xs text-gray-500">
              Limit: {lowStockLimit}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'Product.expiryDate',
      header: 'EXPIRY',
      cell: ({ row }) => {
        const expiryDate = new Date(row.original.Product.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        let expiryColor = 'text-green-600';
        let expiryVariant: "default" | "secondary" | "destructive" = "default";
        
        if (daysUntilExpiry <= 0) {
          expiryColor = 'text-red-600';
          expiryVariant = "destructive";
        } else if (daysUntilExpiry <= 30) {
          expiryColor = 'text-yellow-600';
          expiryVariant = "secondary";
        }
        
        return (
          <div className="flex flex-col gap-1">
            <Badge variant={expiryVariant} className="w-fit">
              {formatDate(row.original.Product.expiryDate)}
            </Badge>
            <div className={`text-xs ${expiryColor}`}>
              {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : 'Expired'}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'deliveryDate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 p-0 font-semibold"
          >
            DELIVERY DATE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-sm text-gray-600">
            {formatDate(row.original.deliveryDate)}
          </div>
        );
      },
    },
    {
      accessorKey: 'Product.tags',
      header: 'TAGS',
      cell: ({ row }) => {
        const tags = row.original.Product.tags;
        return (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'orderCompleted',
      header: 'STATUS',
      cell: ({ row }) => {
        const completed = row.original.orderCompleted;
        return (
          <Badge variant={completed ? "default" : "secondary"}>
            {completed ? 'Completed' : 'Pending'}
          </Badge>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orderItems,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <div className="text-red-600 text-lg font-medium mb-4">
                  Error loading order details
                </div>
                <div className="text-gray-600 mb-4">{error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!orderItems.length && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-64px)]">
          <AdminSidebar />
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <div className="text-gray-600 text-lg mb-4">
                  No order items found
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin/orders')}
                  className="mt-4"
                >
                  Back to Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const order = orderItems[0]?.Order;
  const customer = orderItems[0]?.Customer;
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const calculatedTotal = orderItems.reduce((sum, item) => sum + (item.Product.mrp * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Order Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/admin/orders')}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                    <p className="text-gray-600 mt-2">
                      Order ID: {order?.customeOrderId}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Customer: {customer?.name} • {customer?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(order?.totalPrice || 0)}</p>
                  </div>
                  <Badge className={getStatusBadge(order?.status || '')}>
                    {getStatusIcon(order?.status || '')}
                    <span className="ml-2">{order?.status}</span>
                  </Badge>
                </div>
              </div>

              {/* Order Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Order Date</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatDate(order?.orderDate || '')}</div>
                    <p className="text-xs text-muted-foreground">Date placed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Order Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(order?.totalPrice || 0)}</div>
                    {calculatedTotal !== order?.totalPrice && (
                      <p className="text-xs text-orange-600 mt-1">
                        Calculated: {formatCurrency(calculatedTotal)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">Final amount</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalItems}</div>
                    <p className="text-xs text-muted-foreground">
                      {orderItems.length} product{orderItems.length !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{customer?.name}</div>
                    <p className="text-xs text-muted-foreground">{customer?.email}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Customer Details */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                  <CardDescription>
                    Contact and address details for this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-base">{customer?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-base">{customer?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-base">{customer?.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-base">{customer?.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Metadata */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Order Information
                  </CardTitle>
                  <CardDescription>
                    Technical details and timestamps for this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order ID</p>
                      <p className="text-base font-mono">{order?.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Customer Order ID</p>
                      <p className="text-base font-mono">{order?.customeOrderId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Created At</p>
                      <p className="text-base">{formatDate(order?.createdAt || '')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Last Updated</p>
                      <p className="text-base">{formatDate(order?.updatedAt || '')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Summary */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product Summary
                  </CardTitle>
                  <CardDescription>
                    Breakdown of products by category in this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(() => {
                      const categoryBreakdown = orderItems.reduce((acc, item) => {
                        const category = item.Product.Category.name;
                        acc[category] = (acc[category] || 0) + item.quantity;
                        return acc;
                      }, {} as Record<string, number>);

                      return Object.entries(categoryBreakdown).map(([category, quantity]) => (
                        <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">{category}</p>
                          <p className="text-2xl font-bold text-gray-900">{quantity}</p>
                          <p className="text-xs text-gray-400">items</p>
                        </div>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                  <CardDescription>
                    Delivery schedule and order completion status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                      <p className="text-base">{formatDate(orderItems[0]?.deliveryDate || '')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Order Status</p>
                      <Badge className={getStatusBadge(order?.status || '')}>
                        {getStatusIcon(order?.status || '')}
                        <span className="ml-2">{order?.status}</span>
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Items Completed</p>
                      <p className="text-base">
                        {orderItems.filter(item => item.orderCompleted).length} of {orderItems.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Value</p>
                      <p className="text-base font-semibold">{formatCurrency(calculatedTotal)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Order Created</p>
                        <p className="text-xs text-gray-500">{formatDate(order?.createdAt || '')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Order Updated</p>
                        <p className="text-xs text-gray-500">{formatDate(order?.updatedAt || '')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Delivery Scheduled</p>
                        <p className="text-xs text-gray-500">{formatDate(orderItems[0]?.deliveryDate || '')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-8" />

            {/* Order Items Table */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
                  <p className="text-gray-600 mt-1">
                    Detailed breakdown of all products in this order
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center gap-2"
                >
                  <Package className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
              </div>
              
              {/* Search and Filters */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Input
                        placeholder="Search products..."
                        value={globalFilter ?? ''}
                        onChange={(event) => setGlobalFilter(event.target.value)}
                        className="max-w-sm pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                        {table.getFilteredRowModel().rows.length} of {orderItems.length} items
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-right">
                      <span className="text-gray-500">Total Items:</span>
                      <span className="ml-2 font-semibold text-gray-900">{totalItems}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500">Total Value:</span>
                      <span className="ml-2 font-semibold text-gray-900">{formatCurrency(calculatedTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th key={header.id} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
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
                    <tbody className="bg-white divide-y divide-gray-100">
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, rowIndex) => (
                          <tr 
                            key={row.id} 
                            className={`hover:bg-gray-50 transition-all duration-200 ${
                              rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                            }`}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} className="px-6 py-4 text-sm text-gray-900">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={columns.length} className="h-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <Package className="w-12 h-12 text-gray-300 mb-2" />
                              <p className="text-lg font-medium">No results found</p>
                              <p className="text-sm">Try adjusting your search criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Enhanced Pagination */}
              <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 mt-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      Showing <span className="font-medium text-gray-900">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
                      <span className="font-medium text-gray-900">
                        {Math.min(
                          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                          table.getFilteredRowModel().rows.length
                        )}
                      </span>{' '}
                      of <span className="font-medium text-gray-900">{table.getFilteredRowModel().rows.length}</span> results
                    </span>
                    <span className="text-gray-400">|</span>
                    <span>
                      Page <span className="font-medium text-gray-900">{table.getState().pagination.pageIndex + 1}</span> of{' '}
                      <span className="font-medium text-gray-900">{table.getPageCount()}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
