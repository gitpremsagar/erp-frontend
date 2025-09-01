'use client';

import { useState } from 'react';
import { 
    Bell, 
    Package, 
    Users, 
    Settings, 
    AlertTriangle, 
    Clock, 
    Check, 
    Archive, 
    Trash2, 
    ExternalLink,
    MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notifications, Notification } from './mockData';

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'order':
            return Package;
        case 'inventory':
            return Package;
        case 'customer':
            return Users;
        case 'system':
            return Settings;
        case 'alert':
            return AlertTriangle;
        default:
            return Bell;
    }
};

const getTypeColor = (type: string) => {
    switch (type) {
        case 'order':
            return 'bg-blue-100 text-blue-600';
        case 'inventory':
            return 'bg-green-100 text-green-600';
        case 'customer':
            return 'bg-purple-100 text-purple-600';
        case 'system':
            return 'bg-gray-100 text-gray-600';
        case 'alert':
            return 'bg-red-100 text-red-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'urgent':
            return 'bg-red-500';
        case 'high':
            return 'bg-orange-500';
        case 'medium':
            return 'bg-yellow-500';
        case 'low':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};

const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
};

export default function NotificationsList() {
    const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedNotifications.length === notifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(notifications.map(n => n.id));
        }
    };

    const handleSelectNotification = (id: string) => {
        setSelectedNotifications(prev => 
            prev.includes(id) 
                ? prev.filter(n => n !== id)
                : [...prev, id]
        );
    };

    const handleMarkAsRead = (id: string) => {
        // In a real app, this would update the notification status
        console.log('Mark as read:', id);
    };

    const handleArchive = (id: string) => {
        // In a real app, this would archive the notification
        console.log('Archive:', id);
    };

    const handleDelete = (id: string) => {
        // In a real app, this would delete the notification
        console.log('Delete:', id);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedNotifications.length === notifications.length}
                                onChange={handleSelectAll}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Select All</span>
                        </label>
                        {selectedNotifications.length > 0 && (
                            <span className="text-sm text-gray-500">
                                {selectedNotifications.length} selected
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Check className="w-4 h-4 mr-2" />
                            Mark Read
                        </Button>
                        <Button variant="outline" size="sm">
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                        </Button>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="divide-y divide-gray-200">
                {notifications.map((notification) => {
                    const TypeIcon = getTypeIcon(notification.type);
                    const isSelected = selectedNotifications.includes(notification.id);
                    
                    return (
                        <div 
                            key={notification.id} 
                            className={`p-6 hover:bg-gray-50 transition-colors ${
                                notification.status === 'unread' ? 'bg-blue-50' : ''
                            }`}
                        >
                            <div className="flex items-start space-x-4">
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleSelectNotification(notification.id)}
                                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />

                                {/* Type Icon */}
                                <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                                    <TypeIcon className="w-5 h-5" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    {notification.title}
                                                </h3>
                                                {notification.status === 'unread' && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                )}
                                                {notification.actionRequired && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                        Action Required
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                <span>{notification.sender}</span>
                                                <span>•</span>
                                                <span>{formatTimeAgo(notification.timestamp)}</span>
                                                {notification.orderId && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="font-medium">{notification.orderId}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Priority Indicator */}
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className={`w-3 h-3 rounded-full ${getPriorityColor(notification.priority)}`}
                                                title={`${notification.priority} priority`}
                                            ></div>
                                            
                                            {/* Actions */}
                                            <div className="relative">
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2 mt-3">
                                        {notification.actionRequired && (
                                            <Button size="sm" variant="outline">
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Take Action
                                            </Button>
                                        )}
                                        <Button 
                                            size="sm" 
                                            variant="ghost"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                        >
                                            <Check className="w-4 h-4 mr-2" />
                                            Mark Read
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="ghost"
                                            onClick={() => handleArchive(notification.id)}
                                        >
                                            <Archive className="w-4 h-4 mr-2" />
                                            Archive
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="ghost"
                                            className="text-red-600 hover:text-red-700"
                                            onClick={() => handleDelete(notification.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {notifications.length === 0 && (
                <div className="p-12 text-center">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-500">You're all caught up! No new notifications at the moment.</p>
                </div>
            )}
        </div>
    );
}

