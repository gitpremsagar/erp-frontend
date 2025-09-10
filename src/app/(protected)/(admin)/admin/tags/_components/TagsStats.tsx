'use client';

import { Tag, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface TagsStatsProps {
  totalTags?: number;
  recentlyCreated?: number;
  mostUsed?: number;
  totalProducts?: number;
}

export default function TagsStats({ 
  totalTags = 0, 
  recentlyCreated = 0, 
  mostUsed = 0,
  totalProducts = 0
}: TagsStatsProps) {
  const stats = [
    {
      name: 'Total Tags',
      value: totalTags.toLocaleString(),
      icon: Tag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Recently Created',
      value: recentlyCreated.toLocaleString(),
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Most Used',
      value: mostUsed.toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Tagged Products',
      value: totalProducts.toLocaleString(),
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
