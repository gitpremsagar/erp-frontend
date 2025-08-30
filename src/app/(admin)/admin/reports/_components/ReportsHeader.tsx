import { BarChart3, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsHeader() {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                        <p className="text-gray-600">Comprehensive insights into your business performance</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 30 Days
                    </Button>
                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export All
                    </Button>
                </div>
            </div>
        </div>
    );
}
