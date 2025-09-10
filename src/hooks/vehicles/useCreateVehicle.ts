import { useState } from 'react';
import { vehicleServices } from '../../lib/services/vehicleServices';
import { CreateVehicleSchema } from '../../lib/Schemas/vehicleForm.schema';
import { z } from 'zod';

type CreateVehicleFormData = z.infer<typeof CreateVehicleSchema>;

export const useCreateVehicle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVehicle = async (data: CreateVehicleFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Transform the data to match the API requirements
      const vehicleData = {
        vehicleName: data.vehicleName,
        vehicleNumber: data.vehicleNumber,
        vehicleType: data.vehicleType,
        capacity: data.capacity,
      };

      const response = await vehicleServices.createVehicle(vehicleData);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create vehicle';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createVehicle,
    loading,
    error,
  };
};
