import { useState } from 'react';
import { UserPreferences } from './types';

interface DashboardCustomizationProps {
    preferences: UserPreferences;
    onUpdatePreferences: (newPreferences: Partial<UserPreferences>) => void;
}

export default function DashboardCustomization({ preferences, onUpdatePreferences }: DashboardCustomizationProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCustomization = () => setIsOpen(!isOpen);

    const handleThemeChange = (theme: 'light' | 'dark') => {
        onUpdatePreferences({ theme });
    };

    const handleLayoutChange = (layout: string) => {
        onUpdatePreferences({ layout });
    };

    const handleMetricToggle = (metricId: string) => {
        const updatedMetrics = preferences.favoriteMetrics.includes(metricId)
            ? preferences.favoriteMetrics.filter(id => id !== metricId)
            : [...preferences.favoriteMetrics, metricId];
        onUpdatePreferences({ favoriteMetrics: updatedMetrics });
    };

    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={toggleCustomization}
                className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-xl">
                    <h3 className="text-lg font-semibold mb-2">Customize Dashboard</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-1">Theme</h4>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleThemeChange('light')}
                                    className={`px-3 py-1 rounded ${preferences.theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => handleThemeChange('dark')}
                                    className={`px-3 py-1 rounded ${preferences.theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">Layout</h4>
                            <select
                                value={preferences.layout}
                                onChange={(e) => handleLayoutChange(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="default">Default</option>
                                <option value="compact">Compact</option>
                                <option value="expanded">Expanded</option>
                            </select>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">Favorite Metrics</h4>
                            <div className="space-y-2">
                                {['total_shipments', 'revenue', 'active_orders', 'customer_satisfaction'].map(metric => (
                                    <label key={metric} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={preferences.favoriteMetrics.includes(metric)}
                                            onChange={() => handleMetricToggle(metric)}
                                            className="mr-2"
                                        />
                                        {metric.replace('_', ' ')}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}