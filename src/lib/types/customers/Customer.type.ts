export interface Customer {
  id: string;
  email: string;
  phone: string;
  name: string;
  password: string;
  privilegeId: string;
  aadharNumber: number | null;
  pan: string;
  gstNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  privilege: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CustomersResponse {
  customers: Customer[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
