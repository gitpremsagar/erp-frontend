import QuickActionCard from './QuickActionCard';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

interface QuickActionsGridProps {
    actions: QuickAction[];
}

export default function QuickActionsGrid({ actions }: QuickActionsGridProps) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => (
                    <QuickActionCard
                        key={index}
                        title={action.title}
                        description={action.description}
                        icon={action.icon}
                        href={action.href}
                    />
                ))}
            </div>
        </div>
    );
}
