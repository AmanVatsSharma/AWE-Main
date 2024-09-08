import { GET_SHIPMENT_DETAILS } from '@/ApolloClient/CourierQueries'
import { useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import { MapIcon, TruckIcon, CalendarIcon, UserIcon } from 'lucide-react'

interface ShipmentDetailsProps {
    shipmentId: string | null
}

export default function ShipmentDetails({ shipmentId }: ShipmentDetailsProps) {
    const { loading, error, data } = useQuery(GET_SHIPMENT_DETAILS, {
        variables: { id: shipmentId },
        skip: !shipmentId,
    })

    if (!shipmentId) return <div className="text-center">Select a shipment to view details</div>
    if (loading) return <div className="text-center">Loading shipment details...</div>
    if (error) return <div className="text-center text-red-500">Error loading shipment details. Please try again.</div>

    const { shipment } = data

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Shipment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">General Information</h3>
                    <p className="flex items-center text-gray-600 mb-2">
                        <TruckIcon className="w-5 h-5 mr-2" />
                        Tracking Number: {shipment.trackingNumber}
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        Created At: {new Date(shipment.createdAt).toLocaleString()}
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                        <UserIcon className="w-5 h-5 mr-2" />
                        Status: {shipment.status}
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Package Information</h3>
                    <p className="text-gray-600 mb-2">Weight: {shipment.weight} kg</p>
                    <p className="text-gray-600 mb-2">
                        Dimensions: {shipment.dimensions.length} x {shipment.dimensions.width} x {shipment.dimensions.height} cm
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Sender Information</h3>
                    <p className="text-gray-600 mb-2">Name: {shipment.senderName}</p>
                    <p className="text-gray-600 mb-2">Address: {shipment.senderAddress}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Recipient Information</h3>
                    <p className="text-gray-600 mb-2">Name: {shipment.recipientName}</p>
                    <p className="text-gray-600 mb-2">Address: {shipment.recipientAddress}</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Tracking History</h3>
                <ul className="space-y-4">
                    {shipment.trackingHistory.map((event, index) => (
                        <li key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-500">
                                    {index + 1}
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{event.status}</p>
                                <p className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Shipment Route</h3>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <MapIcon className="w-12 h-12 text-gray-400" />
                    <span className="ml-2 text-gray-600">Map placeholder</span>
                </div>
            </div>
        </motion.div>
    )
}