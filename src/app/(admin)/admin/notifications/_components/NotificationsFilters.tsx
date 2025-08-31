'use client';

import { useState } from 'react';
import { Filter, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function NotificationsFilters() {
    const [filters, setFilters] = useState({
        type: '',
        priority: '',
        status: '',
        dateFrom: '',
        dateTo: '',
        search: ''
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            type: '',
            priority: '',
            status: '',
            dateFrom: '',
            dateTo: '',
            search: ''
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search */}
                <div>
                    <Label htmlFor="search">Search</Label>
                    <Input
                        id="search"
                        placeholder="Search notifications..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="mt-1"
                    />
                </div>

                {/* Type Filter */}
                <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                        id="type"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Types</option>
                        <option value="order">Order</option>
                        <option value="inventory">Inventory</option>
                        <option value="customer">Customer</option>
                        <option value="system">System</option>
                        <option value="alert">Alert</option>
                    </select>
                </div>

                {/* Priority Filter */}
                <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                        id="priority"
                        value={filters.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                {/* Date Range */}
                <div>
                    <Label className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Date Range</span>
                    </Label>
                    <div className="mt-1 space-y-2">
                        <Input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                            placeholder="From"
                        />
                        <Input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                            placeholder="To"
                        />
                    </div>
                </div>

                {/* Action Required Filter */}
                <div>
                    <Label className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Action Required</span>
                    </Label>
                    <div className="mt-2 space-y-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">Show only action required</span>
                        </label>
                    </div>
                </div>

                {/* Clear Filters */}
                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                >
                    Clear Filters
                </Button>
            </CardContent>
        </Card>
    );
}
