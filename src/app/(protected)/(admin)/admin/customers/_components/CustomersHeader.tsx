import { Users } from 'lucide-react';

export default function CustomersHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Users className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
          <p className="text-gray-600">Manage and view all customer information</p>
        </div>
      </div>
    </div>
  );
}
