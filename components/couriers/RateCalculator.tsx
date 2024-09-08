import { motion } from 'framer-motion'
import { CheckCircleIcon } from 'lucide-react'
import { PackageDetails } from './types'
import { IconExclamationCircle } from '@tabler/icons-react'

interface RateCalculatorProps {
    packageDetails: PackageDetails
    onPackageDetailsChange: (newDetails: Partial<PackageDetails>) => void
    onCalculate: () => void
    loading: boolean
    error: any
    data: any
}

export default function RateCalculator({
    packageDetails,
    onPackageDetailsChange,
    onCalculate,
    loading,
    error,
    data,
}: RateCalculatorProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        onPackageDetailsChange({ [name]: value })
    }

    return (
        <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Rate Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    name="fromZip"
                    value={packageDetails.fromZip}
                    onChange={handleInputChange}
                    placeholder="From ZIP"
                    className="border rounded-md p-2"
                />
                <input
                    type="text"
                    name="toZip"
                    value={packageDetails.toZip}
                    onChange={handleInputChange}
                    placeholder="To ZIP"
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    name="weight"
                    value={packageDetails.weight}
                    onChange={handleInputChange}
                    placeholder="Weight (lbs)"
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    name="length"
                    value={packageDetails.length}
                    onChange={handleInputChange}
                    placeholder="Length (in)"
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    name="width"
                    value={packageDetails.width}
                    onChange={handleInputChange}
                    placeholder="Width (in)"
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    name="height"
                    value={packageDetails.height}
                    onChange={handleInputChange}
                    placeholder="Height (in)"
                    className="border rounde
d-md p-2"
                />
            </div>
            <button
                onClick={onCalculate}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                    </span>
                ) : (
                    'Calculate Rate'
                )}
            </button>
            {error && (
                <div className="text-red-500 flex items-center mt-4">
                    <IconExclamationCircle className="w-5 h-5 mr-2" />
                    Error calculating rate. Please try again.
                </div>
            )}
            {data && data.calculateRate && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg shadow-md"
                >
                    <div className="flex items-center mb-2">
                        <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
                        <h3 className="text-lg font-semibold text-green-700">Calculated Rate</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600">${data.calculateRate.rate.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2">Estimated delivery: {data.calculateRate.estimatedDelivery}</p>
                </motion.div>
            )}
        </div>
    )
}