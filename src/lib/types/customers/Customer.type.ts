export interface Customer {
  id: string;
  email: string;
  phone: string;
  name: string;
  password: string;
  userType: string;
  aadharNumber: number | null;
  pan: string | null;
  gstNumber: string | null;
  address: string;
  createdAt: string;
  updatedAt: string;
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
