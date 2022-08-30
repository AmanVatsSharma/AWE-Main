"use client"
import { useState, useEffect } from 'react';
import { CloudIcon, CloudRainIcon, SunIcon } from 'lucide-react';

const weatherIcons = {
    sunny: SunIcon,
    cloudy: CloudIcon,
    rainy: CloudRainIcon,
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState({ temp: 0, condition: 'sunny' });

    useEffect(() => {
        // Simulating API call
        const fetchWeather = () => {
            const conditions = ['sunny', 'cloudy', 'rainy'];
            setWeather({
                temp: Math.floor(Math.random() * 30) + 10,
                condition: conditions[Math.floor(Math.random() * conditions.length)] as 'sunny' | 'cloudy' | 'rainy',
            });
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

        return () => clearInterval(interval);
    }, []);

    const WeatherIcon = weatherIcons[weather.condition];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Weather</h2>
            <div className="flex items-center justify-center">
                <WeatherIcon className="w-16 h-16 text-blue-500 mr-4" />
                <div>
                    <p className="text-4xl font-bold">{weather.temp}°C</p>
                    <p className="text-gray-600 capitalize">{weather.condition}</p>
                </div>
            </div>
        </div>
    );
}