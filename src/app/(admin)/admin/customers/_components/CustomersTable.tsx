'use client';

import { useState } from 'react';
import { Customer } from './mockData';
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomersTableProps {
  customers: Customer[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const getStatusBadge = (status: Customer['status']) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' },
      vip: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'VIP' }
    };

    const config = statusConfig[status];
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`}
                        alt={customer.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">ID: {customer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(customer.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.totalOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(customer.totalSpent)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(customer.joinDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(customer.lastOrderDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">{customers.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <Button variant="outline" size="sm" className="rounded-l-md">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="rounded-r-md">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
