export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip';
  lastOrderDate: string;
  address: string;
  avatar?: string;
}

export const customersData: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-01-15',
    totalOrders: 12,
    totalSpent: 2499.99,
    status: 'vip',
    lastOrderDate: '2024-01-15',
    address: '123 Main St, New York, NY 10001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2023-03-20',
    totalOrders: 8,
    totalSpent: 1249.50,
    status: 'active',
    lastOrderDate: '2024-01-16',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2023-06-10',
    totalOrders: 5,
    totalSpent: 899.99,
    status: 'active',
    lastOrderDate: '2024-01-17',
    address: '789 Pine Rd, Chicago, IL 60601',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 (555) 456-7890',
    joinDate: '2023-08-05',
    totalOrders: 15,
    totalSpent: 2999.99,
    status: 'vip',
    lastOrderDate: '2024-01-18',
    address: '321 Elm St, Miami, FL 33101',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@email.com',
    phone: '+1 (555) 567-8901',
    joinDate: '2023-02-28',
    totalOrders: 3,
    totalSpent: 375.00,
    status: 'inactive',
    lastOrderDate: '2023-12-15',
    address: '654 Maple Dr, Seattle, WA 98101',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+1 (555) 678-9012',
    joinDate: '2023-04-12',
    totalOrders: 20,
    totalSpent: 4999.99,
    status: 'vip',
    lastOrderDate: '2024-01-20',
    address: '987 Cedar Ln, Austin, TX 73301',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+1 (555) 789-0123',
    joinDate: '2023-07-18',
    totalOrders: 7,
    totalSpent: 899.99,
    status: 'active',
    lastOrderDate: '2024-01-21',
    address: '147 Birch Ave, Denver, CO 80201',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Jennifer Martinez',
    email: 'jennifer.m@email.com',
    phone: '+1 (555) 890-1234',
    joinDate: '2023-09-30',
    totalOrders: 11,
    totalSpent: 1974.50,
    status: 'active',
    lastOrderDate: '2024-01-22',
    address: '258 Spruce St, Portland, OR 97201',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '9',
    name: 'Christopher Lee',
    email: 'chris.lee@email.com',
    phone: '+1 (555) 901-2345',
    joinDate: '2023-11-15',
    totalOrders: 4,
    totalSpent: 599.99,
    status: 'active',
    lastOrderDate: '2024-01-10',
    address: '369 Willow Way, Phoenix, AZ 85001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '10',
    name: 'Amanda Garcia',
    email: 'amanda.g@email.com',
    phone: '+1 (555) 012-3456',
    joinDate: '2023-05-22',
    totalOrders: 18,
    totalSpent: 3499.99,
    status: 'vip',
    lastOrderDate: '2024-01-19',
    address: '741 Oak Ridge, San Francisco, CA 94101',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];
