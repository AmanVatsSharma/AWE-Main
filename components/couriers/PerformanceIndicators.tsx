import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface Indicator {
    id: string;
    label: string;
    value: number;
    trend: 'up' | 'down';
}

interface PerformanceIndicatorsProps {
    indicators: Indicator[];
}

export default function PerformanceIndicators({ indicators }: PerformanceIndicatorsProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Performance Indicators</h2>
            <div className="space-y-4">
                {indicators.map((indicator) => (
                    <div key={indicator.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-600">{indicator.label}</p>
                            <p className="text-2xl font-bold">{indicator.value}</p>
                        </div>
                        <div className={`flex items-center ${indicator.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {indicator.trend === 'up' ? (
                                <ArrowUpIcon className="w-5 h-5 mr-1" />
                            ) : (
                                <ArrowDownIcon className="w-5 h-5 mr-1" />
                            )}
                            <span className="text-sm font-medium">2.5%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}