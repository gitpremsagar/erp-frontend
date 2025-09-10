import { API } from '../constants';
import { CustomersResponse, Customer } from '../types/customers/Customer.type';
import { axiosWithAccessToken } from '../api/custom-axios-request';

export const customerServices = {
  createCustomer: async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'privilege'>) => {
    try {
      const response = await axiosWithAccessToken.post(API.CUSTOMERS.CREATE_CUSTOMER, data);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  getAllCustomers: async (): Promise<CustomersResponse> => {
    try {
      const response = await axiosWithAccessToken.get(API.CUSTOMERS.GET_ALL_CUSTOMERS);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  getCustomerById: async (id: string) => {
    try {
      const response = await axiosWithAccessToken.get(API.CUSTOMERS.GET_CUSTOMER_BY_ID.replace(':id', id));
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  updateCustomer: async (id: string, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'privilege'>>) => {
    try {
      const response = await axiosWithAccessToken.put(API.CUSTOMERS.UPDATE_CUSTOMER.replace(':id', id), data);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  deleteCustomer: async (id: string) => {
    try {
      const response = await axiosWithAccessToken.delete(API.CUSTOMERS.DELETE_CUSTOMER.replace(':id', id));
      return response.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
};
