import { motion } from 'framer-motion'
import { TruckIcon } from 'lucide-react'
import { PackageDetails } from './types'
import { IconExclamationCircle } from '@tabler/icons-react'

interface LiveRatesProps {
    packageDetails: PackageDetails
    onPackageDetailsChange: (newDetails: Partial<PackageDetails>) => void
    loading: boolean
    error: any
    data: any
}

export default function LiveRates({ packageDetails, onPackageDetailsChange, loading, error, data }: LiveRatesProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        onPackageDetailsChange({ [name]: value })
    }

    return (
        <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Live Shipping Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                    <input
                        type="text"
                        name="fromZip"
                        value={packageDetails.fromZip}
                        onChange={handleInputChange}
                        placeholder="From ZIP"
                        className="w-full border rounded-md p-2 pl-8"
                    />
                    <TruckIcon className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="toZip"
                        value={packageDetails.toZip}
                        onChange={handleInputChange}
                        placeholder="To ZIP"
                        className="w-full border rounded-md p-2 pl-8"
                    />
                    <TruckIcon className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div className="relative">
                    <input
                        type="number"
                        name="weight"
                        value={packageDetails.weight}
                        onChange={handleInputChange}
                        placeholder="Weight (lbs)"
                        className="w-full border rounded-md p-2 pl-8"
                    />
                    <span className="absolute left-2 top-2.5 text-gray-400">lb</span>
                </div>
            </div>
            {loading && (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="ml-2 text-gray-600">Loading rates...</p>
                </div>
            )}
            {error && (
                <div className="text-red-500 flex items-center">
                    <IconExclamationCircle className="w-5 h-5 mr-2" />
                    Error fetching rates. Please try again.
                </div>
            )}
            {data && data.liveRates && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.liveRates.map((rate, index) => (
                        <motion.div
                            key={rate.courier}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-lg font-semibold mb-2 text-blue-700">{rate.courier}</h3>
                            <p className="text-3xl font-bold text-indigo-600">${rate.rate.toFixed(2)}</p>
                            <p className="text-sm text-gray-600 mt-2">Estimated delivery: {rate.estimatedDelivery}</p>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                                Select
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}