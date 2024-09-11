import { motion } from 'framer-motion'
import { CheckCircleIcon, TruckIcon, PackageIcon, HomeIcon } from 'lucide-react'

interface TrackingInfoProps {
    shipment: any
}

export default function TrackingInfo({ shipment }: TrackingInfoProps) {
    const statusIcons = {
        'Order Placed': PackageIcon,
        'Dispatched': PackageIcon,
        'In Transit': TruckIcon,
        Delivered: HomeIcon,
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Tracking Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Shipment Details</h3>
                    <p className="text-gray-600 mb-1">Tracking Number: {shipment.trackingNumber}</p>
                    <p className="text-gray-600 mb-1">Status: {shipment.status}</p>
                    <p className="text-gray-600 mb-1">
                        Estimated Delivery: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Package Information</h3>
                    <p className="text-gray-600 mb-1">Weight: {shipment.weight} kg</p>
                    <p className="text-gray-600 mb-1">
                        Dimensions: {shipment.dimensions.length} x {shipment.dimensions.width} x {shipment.dimensions.height} cm
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
                <div className="relative">
                    {shipment.trackingHistory.map((event, index) => {
                        const StatusIcon = statusIcons[event.status] || CheckCircleIcon
                        return (
                            <div key={index} className="mb-8 flex items-center relative left-6">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <StatusIcon className="w-5 h-5 text-white" />
                                </div>
                                <div className="ml-4 flex-grow">
                                    <h4 className="text-lg font-medium">{event.status}</h4>
                                    <p className="text-gray-500">{event.location}</p>
                                    <p className="text-gray-400 text-sm">{new Date(event.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-blue-200" style={{ marginLeft: '3px' }} />
                </div>
            </div>
        </motion.div>
    )
}