export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
  joinDate: string;
  lastLogin: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: Session[];
  loginHistory: LoginHistory[];
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface LoginHistory {
  id: string;
  date: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
  ipAddress: string;
}

export interface NotificationSettings {
  email: EmailNotifications;
  push: PushNotifications;
  sms: SMSNotifications;
}

export interface EmailNotifications {
  orderUpdates: boolean;
  inventoryAlerts: boolean;
  customerMessages: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
}

export interface PushNotifications {
  newOrders: boolean;
  paymentConfirmations: boolean;
  customerReviews: boolean;
  systemAlerts: boolean;
  lowStockAlerts: boolean;
}

export interface SMSNotifications {
  orderConfirmations: boolean;
  deliveryUpdates: boolean;
  securityAlerts: boolean;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  sidebarAutoCollapse: boolean;
  showNavigationBadges: boolean;
  compactMode: boolean;
  animations: boolean;
}

export interface BillingSettings {
  currentPlan: Plan;
  paymentMethod: PaymentMethod;
  billingHistory: Invoice[];
  nextBillingDate: string;
}

export interface Plan {
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  status: 'active' | 'cancelled' | 'expired';
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
}

export interface IntegrationSettings {
  connectedServices: ConnectedService[];
  apiKeys: APIKey[];
}

export interface ConnectedService {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
  lastSync?: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  environment: 'production' | 'test' | 'development';
  lastUsed?: string;
  permissions: string[];
}

export interface RegionalSettings {
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  businessInfo: BusinessInfo;
}

export interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  taxId?: string;
  website?: string;
}

// Mock Data
export const mockUserProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'admin@edigital.com',
  phone: '+91 98765 43210',
  bio: 'Experienced administrator with 5+ years in e-commerce management.',
  joinDate: '2023-01-15',
  lastLogin: '2024-12-01T10:30:00Z'
};

export const mockSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  lastPasswordChange: '2024-11-15T14:20:00Z',
  activeSessions: [
    {
      id: '1',
      device: 'Chrome on Windows',
      browser: 'Chrome',
      location: 'Mumbai, India',
      lastActive: '2024-12-01T10:30:00Z',
      isCurrent: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      browser: 'Safari',
      location: 'Mumbai, India',
      lastActive: '2024-11-30T18:45:00Z',
      isCurrent: false
    }
  ],
  loginHistory: [
    {
      id: '1',
      date: '2024-12-01T10:30:00Z',
      device: 'Chrome on Windows',
      location: 'Mumbai, India',
      status: 'success',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      date: '2024-11-30T18:45:00Z',
      device: 'Safari on iPhone',
      location: 'Mumbai, India',
      status: 'success',
      ipAddress: '192.168.1.101'
    }
  ]
};

export const mockNotificationSettings: NotificationSettings = {
  email: {
    orderUpdates: true,
    inventoryAlerts: true,
    customerMessages: true,
    systemUpdates: true,
    marketingEmails: false,
    weeklyReports: true
  },
  push: {
    newOrders: true,
    paymentConfirmations: true,
    customerReviews: false,
    systemAlerts: true,
    lowStockAlerts: true
  },
  sms: {
    orderConfirmations: false,
    deliveryUpdates: false,
    securityAlerts: true
  }
};

export const mockAppearanceSettings: AppearanceSettings = {
  theme: 'light',
  sidebarAutoCollapse: true,
  showNavigationBadges: true,
  compactMode: false,
  animations: true
};

export const mockBillingSettings: BillingSettings = {
  currentPlan: {
    name: 'Pro Plan',
    price: 999,
    currency: 'INR',
    interval: 'monthly',
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access'
    ],
    status: 'active'
  },
  paymentMethod: {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  billingHistory: [
    {
      id: 'INV-001',
      date: '2024-11-15',
      amount: 999,
      currency: 'INR',
      status: 'paid',
      description: 'Pro Plan - November 2024'
    },
    {
      id: 'INV-002',
      date: '2024-10-15',
      amount: 999,
      currency: 'INR',
      status: 'paid',
      description: 'Pro Plan - October 2024'
    },
    {
      id: 'INV-003',
      date: '2024-09-15',
      amount: 999,
      currency: 'INR',
      status: 'paid',
      description: 'Pro Plan - September 2024'
    }
  ],
  nextBillingDate: '2024-12-15'
};

export const mockIntegrationSettings: IntegrationSettings = {
  connectedServices: [
    {
      id: '1',
      name: 'Google Analytics',
      description: 'Track website analytics and user behavior',
      status: 'connected',
      icon: '📊',
      lastSync: '2024-12-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Stripe',
      description: 'Process payments securely',
      status: 'connected',
      icon: '💳',
      lastSync: '2024-12-01T09:30:00Z'
    },
    {
      id: '3',
      name: 'Mailchimp',
      description: 'Email marketing and automation',
      status: 'disconnected',
      icon: '📧'
    },
    {
      id: '4',
      name: 'Slack',
      description: 'Team notifications and alerts',
      status: 'disconnected',
      icon: '💬'
    }
  ],
  apiKeys: [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_••••••••••••••••••••••••••••••••',
      environment: 'production',
      lastUsed: '2024-12-01T10:30:00Z',
      permissions: ['read', 'write', 'delete']
    },
    {
      id: '2',
      name: 'Test API Key',
      key: 'sk_test_••••••••••••••••••••••••••••••••',
      environment: 'test',
      lastUsed: '2024-11-30T15:20:00Z',
      permissions: ['read', 'write']
    }
  ]
};

export const mockRegionalSettings: RegionalSettings = {
  language: 'English (US)',
  timezone: 'Asia/Kolkata',
  currency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  businessInfo: {
    name: 'E-Digital Solutions',
    address: '123 Business Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400001',
    phone: '+91 22 1234 5678',
    taxId: 'GST123456789',
    website: 'https://edigital.com'
  }
};
