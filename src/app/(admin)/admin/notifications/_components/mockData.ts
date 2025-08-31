export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'inventory' | 'customer' | 'system' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'unread' | 'read' | 'archived';
  timestamp: Date;
  sender?: string;
  actionRequired?: boolean;
  orderId?: string;
  customerId?: string;
  productId?: string;
}

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Order #ORD-2024-001 has been placed by John Doe for ₹2,500',
    type: 'order',
    priority: 'high',
    status: 'unread',
    timestamp: new Date('2024-01-15T10:30:00'),
    sender: 'System',
    actionRequired: true,
    orderId: 'ORD-2024-001',
    customerId: 'CUST-001'
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low on stock (5 units remaining)',
    type: 'inventory',
    priority: 'urgent',
    status: 'unread',
    timestamp: new Date('2024-01-15T09:15:00'),
    sender: 'Inventory System',
    actionRequired: true,
    productId: 'PROD-123'
  },
  {
    id: '3',
    title: 'Customer Support Request',
    message: 'Customer Sarah Wilson has submitted a support ticket regarding delivery delay',
    type: 'customer',
    priority: 'medium',
    status: 'unread',
    timestamp: new Date('2024-01-15T08:45:00'),
    sender: 'Support Team',
    actionRequired: true,
    customerId: 'CUST-002'
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM',
    type: 'system',
    priority: 'low',
    status: 'read',
    timestamp: new Date('2024-01-14T16:00:00'),
    sender: 'IT Team',
    actionRequired: false
  },
  {
    id: '5',
    title: 'Payment Failed',
    message: 'Payment for Order #ORD-2024-002 failed. Please contact customer for alternative payment method',
    type: 'alert',
    priority: 'urgent',
    status: 'unread',
    timestamp: new Date('2024-01-15T07:30:00'),
    sender: 'Payment System',
    actionRequired: true,
    orderId: 'ORD-2024-002'
  },
  {
    id: '6',
    title: 'Order Shipped',
    message: 'Order #ORD-2024-003 has been successfully shipped to customer',
    type: 'order',
    priority: 'low',
    status: 'read',
    timestamp: new Date('2024-01-14T14:20:00'),
    sender: 'Shipping Team',
    actionRequired: false,
    orderId: 'ORD-2024-003'
  },
  {
    id: '7',
    title: 'New Customer Registration',
    message: 'New customer "Mike Johnson" has registered on the platform',
    type: 'customer',
    priority: 'low',
    status: 'read',
    timestamp: new Date('2024-01-14T12:10:00'),
    sender: 'System',
    actionRequired: false,
    customerId: 'CUST-003'
  },
  {
    id: '8',
    title: 'Inventory Update',
    message: 'Product "Smart Watch" stock has been updated. New quantity: 25 units',
    type: 'inventory',
    priority: 'low',
    status: 'read',
    timestamp: new Date('2024-01-14T11:00:00'),
    sender: 'Inventory Manager',
    actionRequired: false,
    productId: 'PROD-456'
  },
  {
    id: '9',
    title: 'Security Alert',
    message: 'Multiple failed login attempts detected from IP address 192.168.1.100',
    type: 'alert',
    priority: 'high',
    status: 'unread',
    timestamp: new Date('2024-01-15T06:45:00'),
    sender: 'Security System',
    actionRequired: true
  },
  {
    id: '10',
    title: 'Order Cancelled',
    message: 'Order #ORD-2024-004 has been cancelled by customer due to change of mind',
    type: 'order',
    priority: 'medium',
    status: 'read',
    timestamp: new Date('2024-01-14T10:30:00'),
    sender: 'Customer',
    actionRequired: false,
    orderId: 'ORD-2024-004'
  }
];

export const notificationStats = {
  total: notifications.length,
  unread: notifications.filter(n => n.status === 'unread').length,
  urgent: notifications.filter(n => n.priority === 'urgent').length,
  actionRequired: notifications.filter(n => n.actionRequired).length
};

export const notificationTypes = [
  { value: 'all', label: 'All Types', count: notifications.length },
  { value: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
  { value: 'inventory', label: 'Inventory', count: notifications.filter(n => n.type === 'inventory').length },
  { value: 'customer', label: 'Customers', count: notifications.filter(n => n.type === 'customer').length },
  { value: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
  { value: 'alert', label: 'Alerts', count: notifications.filter(n => n.type === 'alert').length }
];

export const priorityLevels = [
  { value: 'all', label: 'All Priorities', count: notifications.length },
  { value: 'urgent', label: 'Urgent', count: notifications.filter(n => n.priority === 'urgent').length },
  { value: 'high', label: 'High', count: notifications.filter(n => n.priority === 'high').length },
  { value: 'medium', label: 'Medium', count: notifications.filter(n => n.priority === 'medium').length },
  { value: 'low', label: 'Low', count: notifications.filter(n => n.priority === 'low').length }
];

