import { useState } from 'react'
import { useQuery } from '@apollo/client'
// import { GET_COURIERS } from '../graphql/shipmentQueries'
import { motion } from 'framer-motion'

interface CreateShipmentProps {
    onCreateShipment: (shipmentData: any) => void
}

export default function CreateShipment({ onCreateShipment }: CreateShipmentProps) {
    const [shipmentData, setShipmentData] = useState({
        senderName: '',
        senderAddress: '',
        recipientName: '',
        recipientAddress: '',
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        courier: '',
    })

    // const { data: couriersData } = useQuery(GET_COURIERS)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShipmentData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setShipmentData((prev) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [name]: value,
            },
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreateShipment(shipmentData)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Create Shipment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="senderName"
                        value={shipmentData.senderName}
                        onChange={handleInputChange}
                        placeholder="Sender Name"
                        className="w-full border rounded-md p-2"
                        required
                    />
                    <input
                        type="text"
                        name="senderAddress"
                        value={shipmentData.senderAddress}
                        onChange={handleInputChange}
                        placeholder="Sender Address"
                        className="w-full border rounded-md p-2"
                        required
                    />
                    <input
                        type="text"
                        name="recipientName"
                        value={shipmentData.recipientName}
                        onChange={handleInputChange}
                        placeholder="Recipient Name"
                        className="w-full border rounded-md p-2"
                        required
                    />
                    <input
                        type="text"
                        name="recipientAddress"
                        value={shipmentData.recipientAddress}
                        onChange={handleInputChange}
                        placeholder="Recipient Address"
                        className="w-full border rounded-md p-2"
                        required
                    />
                    <input
                        type="number"
                        name="weight"
                        value={shipmentData.weight}
                        onChange={handleInputChange}
                        placeholder="Weight (kg)"
                        className="w-full border rounded-md p-2"
                        required
                    />
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="length"
                            value={shipmentData.dimensions.length}
                            onChange={handleDimensionChange}
                            placeholder="Length (cm)"
                            className="w-full border rounded-md p-2"
                            required
                        />
                        <input
                            type="number"
                            name="width"
                            value={shipmentData.dimensions.width}
                            onChange={handleDimensionChange}
                            placeholder="Width (cm)"
                            className="w-full border rounded-md p-2"
                            required
                        />
                        <input
                            type="number"
                            name="height"
                            value={shipmentData.dimensions.height}
                            onChange={handleDimensionChange}
                            placeholder="Height (cm)"
                            className="w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <select
                        name="courier"
                        value={shipmentData.courier}
                        onChange={handleInputChange}
                        className="w-full border rounded-md p-2"
                        required
                    >
                        <option value="">Select Courier</option>
                        {/* {couriersData?.couriers.map((courier) => (
                            <option key={courier.id} value={courier.id}>
                                {courier.name}
                            </option>
                        ))} */}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Create Shipment
                </button>
            </form>
        </motion.div>
    )
}