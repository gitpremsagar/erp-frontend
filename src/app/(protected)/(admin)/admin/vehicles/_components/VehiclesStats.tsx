import { Truck, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { Vehicle } from '@/lib/types/vehicles/Vehicle.type';

interface VehiclesStatsProps {
  vehicles: Vehicle[];
}

export default function VehiclesStats({ vehicles }: VehiclesStatsProps) {
  const totalVehicles = vehicles.length;
  const totalCapacity = vehicles.reduce((sum, vehicle) => sum + vehicle.capacity, 0);
  const averageCapacity = totalVehicles > 0 ? Math.round(totalCapacity / totalVehicles) : 0;
  
  // Count vehicles by type
  const vehicleTypeCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      name: 'Total Vehicles',
      value: totalVehicles,
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Capacity',
      value: `${totalCapacity.toLocaleString()} boxes`,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Average Capacity',
      value: `${averageCapacity.toLocaleString()} boxes`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Active Vehicles',
      value: totalVehicles, // Assuming all vehicles are active for now
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.bgColor} rounded-lg p-3`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
