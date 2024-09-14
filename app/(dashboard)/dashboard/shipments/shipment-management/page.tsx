'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Tab } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileSearchIcon, ListIcon, PlusIcon, UploadIcon } from 'lucide-react'
import { BULK_CREATE_SHIPMENTS, CREATE_SHIPMENT, GET_SHIPMENTS } from '@/ApolloClient/CourierQueries'
import { toast } from '@/components/ui/use-toast'
import CreateShipment from '@/components/couriers/CreateShipment'
import BulkShipmentUpload from '@/components/couriers/BulkShipmentUpload'
import ShipmentList from '@/components/couriers/ShipmentList'
import ShipmentDetails from '@/components/couriers/ShipmentDetails'

export default function ShipmentManagement() {
    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null)

    const { loading, error, data, refetch } = useQuery(GET_SHIPMENTS)
    const [createShipment] = useMutation(CREATE_SHIPMENT)
    const [bulkCreateShipments] = useMutation(BULK_CREATE_SHIPMENTS)

    const handleCreateShipment = async (shipmentData) => {
        try {
            await createShipment({ variables: { input: shipmentData } })
            toast('Shipment created successfully!')
            refetch()
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: "Error creating shipment. Please try again.",
                variant: "destructive"
            })
        }
    }

    const handleBulkCreateShipments = async (shipmentsData) => {
        try {
            await bulkCreateShipments({ variables: { input: shipmentsData } })
            toast({
                title: "SuccessFull Operation",
                description: 'Bulk shipments created successfully!'
            })
            refetch()
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: 'Error creating bulk shipments. Please try again.',
                variant: "destructive"
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                        Shipment Management
                    </span>
                </h1>
                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-8">
                        {['Create Shipment', 'Bulk Upload', 'Shipment List', 'Shipment Details'].map((tab, index) => (
                            <Tab
                                key={tab}
                                className={({ selected }) =>
                                    `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
                   focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                   ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
                                }
                            >
                                {({ selected }) => (
                                    <div className="flex items-center justify-center">
                                        {index === 0 && <PlusIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {index === 1 && <UploadIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {index === 2 && <ListIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {index === 3 && <FileSearchIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {tab}
                                    </div>
                                )}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        <AnimatePresence mode="wait">
                            <Tab.Panel
                                as={motion.div}
                                key="create-shipment"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CreateShipment onCreateShipment={handleCreateShipment} />
                            </Tab.Panel>
                            <Tab.Panel
                                as={motion.div}
                                key="bulk-upload"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BulkShipmentUpload onBulkCreateShipments={handleBulkCreateShipments} />
                            </Tab.Panel>
                            <Tab.Panel
                                as={motion.div}
                                key="shipment-list"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ShipmentList
                                    shipments={data?.shipments || []}
                                    loading={loading}
                                    // error={error}
                                    onSelectShipment={(id) => {
                                        setSelectedShipmentId(id)
                                        setSelectedTab(3)
                                    }}
                                />
                            </Tab.Panel>
                            <Tab.Panel
                                as={motion.div}
                                key="shipment-details"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ShipmentDetails shipmentId={selectedShipmentId} />
                            </Tab.Panel>
                        </AnimatePresence>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}