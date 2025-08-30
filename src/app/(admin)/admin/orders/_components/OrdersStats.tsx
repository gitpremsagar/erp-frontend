import { Package, Truck, CheckCircle, Clock, DollarSign } from 'lucide-react';

const stats = [
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+12%',
    changeType: 'positive',
    icon: Package,
    color: 'bg-blue-500'
  },
  {
    name: 'Pending Orders',
    value: '23',
    change: '+5%',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-yellow-500'
  },
  {
    name: 'Shipped Orders',
    value: '156',
    change: '+8%',
    changeType: 'positive',
    icon: Truck,
    color: 'bg-purple-500'
  },
  {
    name: 'Delivered Orders',
    value: '1,055',
    change: '+15%',
    changeType: 'positive',
    icon: CheckCircle,
    color: 'bg-green-500'
  },
  {
    name: 'Total Revenue',
    value: '$45,678',
    change: '+18%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-emerald-500'
  }
];

export default function OrdersStats() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
