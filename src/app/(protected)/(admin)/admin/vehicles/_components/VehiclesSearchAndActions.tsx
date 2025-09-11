'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function VehiclesSearchAndActions() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search vehicles by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="TRUCK">Truck</SelectItem>
                <SelectItem value="PICKUP">Pickup</SelectItem>
                <SelectItem value="VAN">Van</SelectItem>
                <SelectItem value="CAR">Car</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push('/admin/vehicles/add-new-vehicle')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>
    </div>
  );
}
