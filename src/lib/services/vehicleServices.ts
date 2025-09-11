import { API } from '../constants';
import { VehiclesResponse, Vehicle, CreateVehicleData, UpdateVehicleData } from '../types/vehicles/Vehicle.type';
import { axiosWithAccessToken } from '../api/custom-axios-request';

export const vehicleServices = {
  createVehicle: async (data: CreateVehicleData) => {
    try {
      const response = await axiosWithAccessToken.post(API.VEHICLES.CREATE_VEHICLE, data);
      return response.data;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  },

  getAllVehicles: async (): Promise<VehiclesResponse> => {
    try {
      const response = await axiosWithAccessToken.get(API.VEHICLES.GET_ALL_VEHICLES);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  getVehicleById: async (id: string) => {
    try {
      const response = await axiosWithAccessToken.get(API.VEHICLES.GET_VEHICLE_BY_ID.replace(':id', id));
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      throw error;
    }
  },

  updateVehicle: async (id: string, data: UpdateVehicleData) => {
    try {
      const response = await axiosWithAccessToken.put(API.VEHICLES.UPDATE_VEHICLE.replace(':id', id), data);
      return response.data;
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  deleteVehicle: async (id: string) => {
    try {
      const response = await axiosWithAccessToken.delete(API.VEHICLES.DELETE_VEHICLE.replace(':id', id));
      return response.data;
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
};
