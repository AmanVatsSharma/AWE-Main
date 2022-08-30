import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface WeatherForecastProps {
    shipment: any
}

export default function WeatherForecast({ shipment }: WeatherForecastProps) {
    const [forecast, setForecast] = useState<any[]>([])

    useEffect(() => {
        // In a real application, you would fetch this data from a weather API
        // Here, we're generating mock data for demonstration purposes
        const mockForecast = Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
            temperature: Math.round(Math.random() * 20 + 10),
            precipitation: Math.round(Math.random() * 100),
        }))
        setForecast(mockForecast)
    }, [shipment])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
            <p className="text-gray-600 mb-4">
                Weather forecast for the delivery route to {shipment.trackingHistory[shipment.trackingHistory.length - 1].location}
            </p>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecast}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="precipitation" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Delivery Impact</h3>
                <p className="text-gray-600">
                    Based on the weather forecast, we do not anticipate any delays in your shipment.
                    However, please note that severe weather conditions may affect delivery times.
                </p>
            </div>
        </motion.div>
    )
}