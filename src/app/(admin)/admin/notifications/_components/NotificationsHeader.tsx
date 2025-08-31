'use client';

import { Bell, Check, Archive, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationsHeader() {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Bell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-gray-600">Manage and respond to system notifications</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                        <Check className="w-4 h-4 mr-2" />
                        Mark All Read
                    </Button>
                    <Button variant="outline" size="sm">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive All
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                </div>
            </div>
        </div>
    );
}

