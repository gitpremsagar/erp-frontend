import { Truck } from 'lucide-react';

export default function VehiclesHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Truck className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicles Management</h1>
          <p className="text-gray-600">Manage and view all vehicle information</p>
        </div>
      </div>
    </div>
  );
}
