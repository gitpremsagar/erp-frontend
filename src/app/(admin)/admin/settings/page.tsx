'use client';

import { useState } from 'react';
import { Settings, User, Shield, Bell, Palette, Database, Globe, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SettingsHeader from './_components/SettingsHeader';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Manage your personal information and account details',
      icon: User,
      content: <ProfileSettings />
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Configure security settings and privacy preferences',
      icon: Shield,
      content: <SecuritySettings />
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Customize your notification preferences',
      icon: Bell,
      content: <NotificationSettings />
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize the look and feel of your dashboard',
      icon: Palette,
      content: <AppearanceSettings />
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'Manage your billing information and subscription',
      icon: CreditCard,
      content: <BillingSettings />
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with third-party services and APIs',
      icon: Database,
      content: <IntegrationSettings />
    },
    {
      id: 'regional',
      title: 'Regional Settings',
      description: 'Set your timezone, language, and currency preferences',
      icon: Globe,
      content: <RegionalSettings />
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <SettingsHeader />

      {/* Settings Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-7 h-auto bg-transparent p-0">
                {settingsSections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex flex-col items-center space-y-2 p-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{section.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {settingsSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-gray-600 mt-1">{section.description}</p>
                  </div>
                  {section.content}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Profile Settings Component
function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="admin@edigital.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="+91 98765 43210"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a new profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <Button variant="outline">Upload New Picture</Button>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Security Settings Component
function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">SMS Authentication</p>
              <p className="text-sm text-gray-500">Receive codes via SMS</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Chrome on Windows</p>
                <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Safari on iPhone</p>
                <p className="text-sm text-gray-500">Last active: 1 day ago</p>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Notification Settings Component
function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose which emails you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'Order Updates', description: 'Get notified about order status changes' },
            { title: 'Inventory Alerts', description: 'Receive low stock notifications' },
            { title: 'Customer Messages', description: 'New customer inquiries and messages' },
            { title: 'System Updates', description: 'Important system maintenance notifications' },
            { title: 'Marketing Emails', description: 'Promotional content and newsletters' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={index < 3}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure in-app notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: 'New Orders', description: 'Instant notifications for new orders' },
            { title: 'Payment Confirmations', description: 'Payment success and failure alerts' },
            { title: 'Customer Reviews', description: 'New customer reviews and ratings' },
            { title: 'System Alerts', description: 'Critical system notifications' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={index < 2}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Appearance Settings Component
function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Light', color: 'bg-white border-2 border-blue-500' },
              { name: 'Dark', color: 'bg-gray-900' },
              { name: 'Auto', color: 'bg-gradient-to-r from-white to-gray-900' }
            ].map((theme, index) => (
              <div key={index} className="text-center">
                <div className={`w-full h-16 rounded-lg ${theme.color} mb-2 cursor-pointer`} />
                <p className="text-sm font-medium text-gray-900">{theme.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>
          <CardDescription>Customize your sidebar behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-collapse sidebar</p>
              <p className="text-sm text-gray-500">Automatically collapse sidebar on smaller screens</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Show navigation badges</p>
              <p className="text-sm text-gray-500">Display notification badges on navigation items</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Billing Settings Component
function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-blue-900">Pro Plan</p>
                <p className="text-blue-700">₹999/month</p>
              </div>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
            <p className="text-sm text-blue-600 mt-2">Next billing date: December 15, 2024</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Update your payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Nov 15, 2024', amount: '₹999', status: 'Paid' },
              { date: 'Oct 15, 2024', amount: '₹999', status: 'Paid' },
              { date: 'Sep 15, 2024', amount: '₹999', status: 'Paid' }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                  <p className="text-sm text-gray-500">{invoice.amount}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {invoice.status}
                  </span>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Integration Settings Component
function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
          <CardDescription>Manage your third-party integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Google Analytics', status: 'Connected', description: 'Track website analytics' },
            { name: 'Stripe', status: 'Connected', description: 'Payment processing' },
            { name: 'Mailchimp', status: 'Disconnected', description: 'Email marketing' },
            { name: 'Slack', status: 'Disconnected', description: 'Team notifications' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{service.name}</p>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  service.status === 'Connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.status}
                </span>
                <Button variant="outline" size="sm">
                  {service.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for external integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Production API Key</p>
                <p className="text-sm text-gray-500">sk_live_••••••••••••••••••••••••••••••••</p>
              </div>
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Test API Key</p>
                <p className="text-sm text-gray-500">sk_test_••••••••••••••••••••••••••••••••</p>
              </div>
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Regional Settings Component
function RegionalSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Language & Region</CardTitle>
          <CardDescription>Set your preferred language and regional settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Asia/Kolkata (UTC+5:30)</option>
              <option>America/New_York (UTC-5:00)</option>
              <option>Europe/London (UTC+0:00)</option>
              <option>Asia/Tokyo (UTC+9:00)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Indian Rupee (₹)</option>
              <option>US Dollar ($)</option>
              <option>Euro (€)</option>
              <option>British Pound (£)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Set your business details for invoices and reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="E-Digital Solutions"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="123 Business Street, Mumbai, Maharashtra 400001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="GST Number or Tax ID"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
