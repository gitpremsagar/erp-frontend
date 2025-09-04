import { useState, useEffect } from 'react';
import { customerServices } from '../../lib/services/customerServices';
import { Customer, CustomersResponse } from '../../lib/types/customers/Customer.type';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<CustomersResponse['pagination'] | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerServices.getAllCustomers();
      setCustomers(response.customers);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const refreshCustomers = () => {
    fetchCustomers();
  };

  return {
    customers,
    loading,
    error,
    pagination,
    refreshCustomers,
  };
};
