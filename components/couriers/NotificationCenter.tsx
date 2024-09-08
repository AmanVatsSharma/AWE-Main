import { useState } from 'react';
import { BellIcon, XIcon } from 'lucide-react';

const sampleNotifications = [
    { id: 1, message: 'New shipment request from Customer A', timestamp: '5 minutes ago' },
    { id: 2, message: 'Delivery delayed for Order #12345', timestamp: '1 hour ago' },
    { id: 3, message: 'Customer feedback received for recent delivery', timestamp: '3 hours ago' },
];

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState(sampleNotifications);

    const removeNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <BellIcon className="w-6 h-6 mr-2 text-blue-500" />
                Notifications
            </h2>
            {notifications.length === 0 ? (
                <p className="text-gray-500">No new notifications</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map(notification => (
                        <li key={notification.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
                            <div className="flex-grow">
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                            </div>
                            <button
                                onClick={() => removeNotification(notification.id)}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}