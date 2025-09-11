import { useState } from 'react';
import { customerServices } from '../../lib/services/customerServices';
import { CreateCustomerSchema } from '../../lib/Schemas/customerForm.schema';
import { z } from 'zod';

type CreateCustomerFormData = z.infer<typeof CreateCustomerSchema>;

export const useCreateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = async (data: CreateCustomerFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Transform the data to match the API requirements
      const customerData = {
        ...data,
        aadharNumber: data.aadharNumber ? Number(data.aadharNumber) : null,
        pan: data.pan || '',
        gstNumber: data.gstNumber || '',
        address: data.address || '',
        password: data.password,
        userType: 'customer', // Default user type for new customers
      };

      const response = await customerServices.createCustomer(customerData);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create customer';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCustomer,
    loading,
    error,
  };
};
