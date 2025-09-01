export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  paymentMethod: string;
  shippingAddress: string;
  orderNumber: string;
}

export const ordersData: Order[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    orderDate: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: 3,
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Main St, New York, NY 10001',
    orderNumber: 'ORD-2024-001'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    orderDate: '2024-01-16',
    status: 'shipped',
    total: 149.50,
    items: 2,
    paymentMethod: 'PayPal',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    orderNumber: 'ORD-2024-002'
  },
  {
    id: '3',
    customerName: 'Michael Brown',
    customerEmail: 'michael.b@email.com',
    orderDate: '2024-01-17',
    status: 'processing',
    total: 89.99,
    items: 1,
    paymentMethod: 'Credit Card',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    orderNumber: 'ORD-2024-003'
  },
  {
    id: '4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.d@email.com',
    orderDate: '2024-01-18',
    status: 'pending',
    total: 199.99,
    items: 4,
    paymentMethod: 'Bank Transfer',
    shippingAddress: '321 Elm St, Miami, FL 33101',
    orderNumber: 'ORD-2024-004'
  },
  {
    id: '5',
    customerName: 'David Wilson',
    customerEmail: 'david.w@email.com',
    orderDate: '2024-01-19',
    status: 'cancelled',
    total: 75.00,
    items: 2,
    paymentMethod: 'Credit Card',
    shippingAddress: '654 Maple Dr, Seattle, WA 98101',
    orderNumber: 'ORD-2024-005'
  },
  {
    id: '6',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.a@email.com',
    orderDate: '2024-01-20',
    status: 'delivered',
    total: 399.99,
    items: 5,
    paymentMethod: 'PayPal',
    shippingAddress: '987 Cedar Ln, Austin, TX 73301',
    orderNumber: 'ORD-2024-006'
  },
  {
    id: '7',
    customerName: 'Robert Taylor',
    customerEmail: 'robert.t@email.com',
    orderDate: '2024-01-21',
    status: 'shipped',
    total: 129.99,
    items: 2,
    paymentMethod: 'Credit Card',
    shippingAddress: '147 Birch Ave, Denver, CO 80201',
    orderNumber: 'ORD-2024-007'
  },
  {
    id: '8',
    customerName: 'Jennifer Martinez',
    customerEmail: 'jennifer.m@email.com',
    orderDate: '2024-01-22',
    status: 'processing',
    total: 179.50,
    items: 3,
    paymentMethod: 'Bank Transfer',
    shippingAddress: '258 Spruce St, Portland, OR 97201',
    orderNumber: 'ORD-2024-008'
  }
];
