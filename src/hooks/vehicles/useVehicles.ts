import { useState, useEffect } from 'react';
import { vehicleServices } from '@/lib/services/vehicleServices';
import { Vehicle } from '@/lib/types/vehicles/Vehicle.type';

interface UseVehiclesReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const useVehicles = (): UseVehiclesReturn => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vehicleServices.getAllVehicles();
      setVehicles(response.vehicles);
      setPagination(prev => ({
        ...prev,
        total: response.vehicles.length,
        totalPages: Math.ceil(response.vehicles.length / prev.limit),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vehicles');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    loading,
    error,
    refetch: fetchVehicles,
    pagination,
  };
};
