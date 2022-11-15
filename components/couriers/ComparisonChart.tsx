import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ComparisonChartProps {
    data: Array<{ courier: string; rate: number }>
}

export default function ComparisonChart({ data }: ComparisonChartProps) {
    const chartData = {
        labels: data.map((rate) => rate.courier),
        datasets: [
            {
                label: 'Shipping Rate',
                data: data.map((rate) => rate.rate),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
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
                text: 'Shipping Rate Comparison',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Rate ($)',
                },
            },
        },
    }

    return (
        <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Rate Comparison</h2>
            <Bar data={chartData} options={options} />
        </div>
    )
}