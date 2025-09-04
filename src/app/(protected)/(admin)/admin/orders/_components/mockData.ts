export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  orderDate: string;
  paymentMethod: string;
}

export const ordersData: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    status: 'pending',
    total: 2500,
    items: 3,
    orderDate: '2024-01-15',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    status: 'processing',
    total: 1800,
    items: 2,
    orderDate: '2024-01-14',
    paymentMethod: 'PayPal'
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customerName: 'Mike Wilson',
    customerEmail: 'mike.wilson@email.com',
    status: 'shipped',
    total: 3200,
    items: 4,
    orderDate: '2024-01-13',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    status: 'delivered',
    total: 1500,
    items: 1,
    orderDate: '2024-01-12',
    paymentMethod: 'Credit Card'
  },
  {
    id: '5',
    orderNumber: 'ORD-005',
    customerName: 'David Brown',
    customerEmail: 'david.brown@email.com',
    status: 'cancelled',
    total: 2800,
    items: 3,
    orderDate: '2024-01-11',
    paymentMethod: 'PayPal'
  },
  {
    id: '6',
    orderNumber: 'ORD-006',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@email.com',
    status: 'pending',
    total: 2100,
    items: 2,
    orderDate: '2024-01-10',
    paymentMethod: 'Credit Card'
  },
  {
    id: '7',
    orderNumber: 'ORD-007',
    customerName: 'Robert Taylor',
    customerEmail: 'robert.taylor@email.com',
    status: 'processing',
    total: 4500,
    items: 5,
    orderDate: '2024-01-09',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '8',
    orderNumber: 'ORD-008',
    customerName: 'Jennifer White',
    customerEmail: 'jennifer.white@email.com',
    status: 'shipped',
    total: 1900,
    items: 2,
    orderDate: '2024-01-08',
    paymentMethod: 'Credit Card'
  }
];
