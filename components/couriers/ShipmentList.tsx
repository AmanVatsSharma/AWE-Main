import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface Shipment {
    id: string
    trackingNumber: string
    status: string
    senderName: string
    recipientName: string
    createdAt: string
}

interface ShipmentListProps {
    shipments: Shipment[]
    loading: boolean
    error?: any
    onSelectShipment: (id: string) => void
}

export default function ShipmentList({ shipments, loading, error, onSelectShipment }: ShipmentListProps) {
    const [sortField, setSortField] = useState<keyof Shipment>('createdAt')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [filter, setFilter] = useState('')

    const handleSort = (field: keyof Shipment) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const filteredAndSortedShipments = shipments
        .filter(
            (shipment) =>
                shipment.trackingNumber.toLowerCase().includes(filter.toLowerCase()) ||
                shipment.senderName.toLowerCase().includes(filter.toLowerCase()) ||
                shipment.recipientName.toLowerCase().includes(filter.toLowerCase()) ||
                shipment.status.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

    if (loading) return <div className="text-center">Loading shipments...</div>
    if (error) return <div className="text-center text-red-500">Error loading shipments. Please try again.</div>

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Shipment List</h2>
            <input
                type="text"
                placeholder="Filter shipments..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full mb-4 p-2 border rounded-md"
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Tracking Number', 'Status', 'Sender', 'Recipient', 'Created At'].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort(header.toLowerCase().replace(' ', '') as keyof Shipment)}
                                >
                                    <div className="flex items-center">
                                        {header}
                                        {sortField === header.toLowerCase().replace(' ', '') && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <ChevronUpIcon className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDownIcon className="w-4 h-4" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAndSortedShipments.map((shipment) => (
                            <tr
                                key={shipment.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => onSelectShipment(shipment.id)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {shipment.trackingNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.senderName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.recipientName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(shipment.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}