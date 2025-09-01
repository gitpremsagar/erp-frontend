'use client';

import { Bell, Eye, AlertTriangle, Clock } from 'lucide-react';
import { notificationStats } from './mockData';

export default function NotificationsStats() {
    const stats = [
        {
            title: 'Total Notifications',
            value: notificationStats.total,
            icon: Bell,
            color: 'bg-blue-500',
            textColor: 'text-blue-600'
        },
        {
            title: 'Unread',
            value: notificationStats.unread,
            icon: Eye,
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600'
        },
        {
            title: 'Urgent',
            value: notificationStats.urgent,
            icon: AlertTriangle,
            color: 'bg-red-500',
            textColor: 'text-red-600'
        },
        {
            title: 'Action Required',
            value: notificationStats.actionRequired,
            icon: Clock,
            color: 'bg-orange-500',
            textColor: 'text-orange-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

