import { PlusIcon, TruckIcon, CalculatorIcon, SearchIcon } from 'lucide-react';

export default function QuickActions() {
    const actions = [
        { icon: PlusIcon, label: 'Create Shipment', href: '/dashboard/couriers/shipment-management' },
        { icon: TruckIcon, label: 'Track Shipment', href: '#' },
        { icon: CalculatorIcon, label: 'Calculate Rates', href: '/dashboard/couriers/rate-calculation' },
        { icon: SearchIcon, label: 'Search Orders', href: '#' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                {actions.map(action => (
                    <a
                        key={action.label}
                        href={action.href}
                        className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <action.icon className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-sm font-medium">{action.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}