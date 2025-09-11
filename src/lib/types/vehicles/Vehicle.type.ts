export interface Vehicle {
  id: string;
  vehicleName: string;
  vehicleNumber: string;
  vehicleType: 'TRUCK' | 'PICKUP' | 'VAN' | 'CAR';
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface VehiclesResponse {
  vehicles: Vehicle[];
}

export interface CreateVehicleData {
  vehicleName: string;
  vehicleNumber: string;
  vehicleType: 'TRUCK' | 'PICKUP' | 'VAN' | 'CAR';
  capacity: number;
}

export interface UpdateVehicleData {
  vehicleName?: string;
  vehicleNumber?: string;
  vehicleType?: 'TRUCK' | 'PICKUP' | 'VAN' | 'CAR';
  capacity?: number;
}
