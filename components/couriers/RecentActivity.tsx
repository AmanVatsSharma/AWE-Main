import { BellIcon, ShoppingCartIcon, TruckIcon } from 'lucide-react';
import { Activity } from './types';

interface RecentActivityProps {
    activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'shipment':
                return <TruckIcon className="w-5 h-5 text-blue-500" />;
            case 'order':
                return <ShoppingCartIcon className="w-5 h-5 text-green-500" />;
            default:
                return <BellIcon className="w-5 h-5 text-yellow-500" />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-4">
                {activities.map(activity => (
                    <li key={activity.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                        <div className="mr-3">{getIcon(activity.type)}</div>
                        <div className="flex-grow">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}