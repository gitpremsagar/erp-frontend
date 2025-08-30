import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

export default function QuickActionCard({ title, description, icon: Icon, href }: QuickActionCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
