import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShipmentData } from './types';

interface ShipmentChartProps {
    data: ShipmentData[];
}

export default function ShipmentChart({ data }: ShipmentChartProps) {
    const [timeRange, setTimeRange] = useState('7d');

    const filteredData = data.slice(-getTimeRangeDays(timeRange));

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Shipment Trends</h2>
                <div className="space-x-2">
                    {['7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1 rounded ${timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="shipments" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function getTimeRangeDays(range: string): number {
    switch (range) {
        case '30d':
            return 30;
        case '90d':
            return 90;
        default:
            return 7;
    }
}