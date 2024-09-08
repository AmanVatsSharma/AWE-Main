import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Metric } from './types';

interface MetricsOverviewProps {
    metrics: Metric[];
    favoriteMetrics: string[];
}

export default function MetricsOverview({ metrics, favoriteMetrics }: MetricsOverviewProps) {
    const filteredMetrics = metrics.filter(metric => favoriteMetrics.includes(metric.id));

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Key Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
                {filteredMetrics.map(metric => (
                    <div key={metric.id} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                        <p className="text-3xl font-bold">{metric.value}</p>
                        {metric.change && (
                            <div className={`flex items-center justify-center mt-2 ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {metric.change > 0 ? (
                                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                                ) : (
                                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                                )}
                                <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}