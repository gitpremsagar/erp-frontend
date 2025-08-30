import StatsCard from './StatsCard';
import { LucideIcon } from 'lucide-react';

interface Stat {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: string;
}

interface StatsGridProps {
    stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </div>
    );
}
