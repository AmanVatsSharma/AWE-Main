import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface HistoricalRate {
    date: string
    rate: number
}

export default function RateHistory() {
    const [historicalRates, setHistoricalRates] = useState<HistoricalRate[]>([])

    useEffect(() => {
        // Simulating API call to fetch historical rates
        const fetchHistoricalRates = () => {
            const mockData: HistoricalRate[] = Array.from({ length: 30 }, (_, i) => ({
                date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                rate: Math.random() * 10 + 20, // Random rate between 20 and 30
            })).reverse()
            setHistoricalRates(mockData)
        }

        fetchHistoricalRates()
    }, [])

    const chartData = {
        labels: historicalRates.map((rate) => rate.date),
        datasets: [
            {
                label: 'Historical Rates',
                data: historicalRates.map((rate) => rate.rate),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Historical Shipping Rates',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Rate ($)',
                },
            },
        },
    }

    return (
        <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Rate History</h2>
            <Line data={chartData} options={options} />
        </div>
    )
}