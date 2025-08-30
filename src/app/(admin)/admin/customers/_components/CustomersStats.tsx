import { Users, UserCheck, Crown, DollarSign } from 'lucide-react';

export default function CustomersStats() {
  const stats = [
    {
      name: 'Total Customers',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      name: 'Active Customers',
      value: '987',
      change: '+8%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      name: 'VIP Customers',
      value: '156',
      change: '+15%',
      changeType: 'positive',
      icon: Crown,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
         {
       name: 'Avg. Order Value',
       value: '₹89.50',
       change: '+5%',
       changeType: 'positive',
       icon: DollarSign,
       color: 'bg-orange-500',
       bgColor: 'bg-orange-100',
       textColor: 'text-orange-600'
     }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
