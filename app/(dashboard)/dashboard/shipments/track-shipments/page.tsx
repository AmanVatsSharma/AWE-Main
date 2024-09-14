'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { GET_SHIPMENT_TRACKING, SHIPMENT_UPDATED_SUBSCRIPTION, GENERATE_TRACKING_PAGE, UPDATE_DELIVERY_PREFERENCES } from '@/ApolloClient/CourierQueries'
import { motion, AnimatePresence } from 'framer-motion'
import { Tab } from '@headlessui/react'
import { toast } from '@/components/ui/use-toast'
import TrackingPageGenerator from '@/components/couriers/TrackingPageGenerator'
import PackageSimulator from '@/components/couriers/PackageSimulator'
import WeatherForecast from '@/components/couriers/WeatherForecast'
import DeliveryPreferences from '@/components/couriers/DeliveryPreferences'
import TrackingInfo from '@/components/couriers/TrackingInfo'
import TrackingMap from '@/components/couriers/TrackingMap'

const ShipmentTracking = () => {
    const [trackingNumber, setTrackingNumber] = useState('')
    const [selectedTab, setSelectedTab] = useState(0)

    const { loading, error, data, refetch } = useQuery(GET_SHIPMENT_TRACKING, {
        variables: { trackingNumber },
        skip: !trackingNumber,
    })

    const { data: subscriptionData } = useSubscription(SHIPMENT_UPDATED_SUBSCRIPTION, {
        variables: { trackingNumber },
    })

    const [generateTrackingPage] = useMutation(GENERATE_TRACKING_PAGE)
    const [updateDeliveryPreferences] = useMutation(UPDATE_DELIVERY_PREFERENCES)

    useEffect(() => {
        if (subscriptionData) {
            toast({
                title: `Shipment ${subscriptionData.shipmentUpdated.trackingNumber} has been updated`
            })
            refetch()
        }
    }, [subscriptionData, refetch])

    const handleTrackingSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        refetch()
    }

    const handleGenerateTrackingPage = async (customizations: any) => {
        try {
            const { data } = await generateTrackingPage({
                variables: { trackingNumber, customizations },
            })
            toast({
                title: `Tracking page generated: ${data.generateTrackingPage.url}`
            })
        } catch (error) {
            toast({
                title: 'Error generating tracking page',
                variant: "destructive"
            })
        }
    }

    const handleUpdateDeliveryPreferences = async (preferences: any) => {
        try {
            await updateDeliveryPreferences({
                variables: { trackingNumber, preferences },
            })
            toast({
                title: 'Delivery preferences updated successfully'
            })
            refetch()
        } catch (error) {
            toast({
                title: 'Error updating delivery preferences',
                variant: "destructive"
            })
        }
    }

    // Sample data for demonstration
    const sampleShipment = {
        id: '123456',
        trackingNumber: 'SAMPLE-123456',
        status: 'In Transit',
        estimatedDelivery: '2023-06-15T14:00:00Z',
        weight: 5.2,
        dimensions: { length: 30, width: 20, height: 15 },
        trackingHistory: [
            { status: 'Order Placed', location: 'New York, NY', latitude: 40.7128, longitude: -74.0060, timestamp: '2023-06-10T10:00:00Z' },
            { status: 'Picked Up', location: 'New York, NY', latitude: 40.7128, longitude: -74.0060, timestamp: '2023-06-11T09:30:00Z' },
            { status: 'In Transit', location: 'Philadelphia, PA', latitude: 39.9526, longitude: -75.1652, timestamp: '2023-06-12T14:45:00Z' },
            { status: 'In Transit', location: 'Washington, D.C.', latitude: 38.9072, longitude: -77.0369, timestamp: '2023-06-13T11:20:00Z' },
        ],
        deliveryPreferences: {
            signature: true,
            safeDropOff: false,
            holdAtLocation: false,
        },
    }

    const shipmentData = data?.shipmentTracking || sampleShipment

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                        Advanced Shipment Tracking
                    </span>
                </h1>
                <form onSubmit={handleTrackingSubmit} className="mb-8">
                    <div className="flex items-center justify-center">
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            placeholder="Enter tracking number"
                            className="w-full max-w-md px-4 py-2 rounded-l-md border-2 border-r-0 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Track
                        </button>
                    </div>
                </form>
                {loading && <div className="text-center">Loading tracking information...</div>}
                {error && <div className="text-center text-red-500">Error loading tracking information. Please try again.</div>}
                {shipmentData && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={shipmentData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                                <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-8">
                                    {['Tracking Info', 'Map View', 'Delivery Preferences', 'Weather Forecast', '3D Package View', 'Generate Tracking Page'].map((tab, index) => (
                                        <Tab
                                            key={tab}
                                            className={({ selected }) =>
                                                `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
                         focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                         ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
                                            }
                                        >
                                            {tab}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <TrackingInfo shipment={shipmentData} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <TrackingMap shipment={shipmentData} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <DeliveryPreferences
                                            shipment={shipmentData}
                                            onUpdatePreferences={handleUpdateDeliveryPreferences}
                                        />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <WeatherForecast shipment={shipmentData} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <PackageSimulator shipment={shipmentData} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <TrackingPageGenerator
                                            shipment={shipmentData}
                                            onGenerate={handleGenerateTrackingPage}
                                        />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}
export default ShipmentTracking