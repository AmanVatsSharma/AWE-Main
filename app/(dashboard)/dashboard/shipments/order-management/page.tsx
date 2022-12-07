'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Tab } from '@headlessui/react'
import OrderImport from '@/components/couriers/OrderImport'
import OrderList from '@/components/couriers/OrderList'
import OrderDetails from '@/components/couriers/OrderDetails'
import { toast } from '@/components/ui/use-toast'
import { GET_ORDER_DETAILS, GET_ORDERS, IMPORT_ORDERS, UPDATE_ORDER_STATUS } from '@/ApolloClient/CourierQueries'

export default function OrderManagement() {
    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

    const { loading: ordersLoading, error: ordersError, data: ordersData, refetch: refetchOrders } = useQuery(GET_ORDERS)
    const { loading: orderDetailsLoading, error: orderDetailsError, data: orderDetailsData } = useQuery(GET_ORDER_DETAILS, {
        variables: { id: selectedOrderId },
        skip: !selectedOrderId,
    })

    const [importOrders] = useMutation(IMPORT_ORDERS)
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS)

    const handleImportOrders = async (platform: string, file: File) => {
        try {
            const { data } = await importOrders({ variables: { platform, file } })
            toast({
                title: `Successfully imported ${data.importOrders.count} orders`
            })
            refetchOrders()
        } catch (error) {
            toast({ title: 'Error importing orders' })
        }
    }

    const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            await updateOrderStatus({ variables: { id: orderId, status: newStatus } })
            toast(
                { title: 'Order status updated successfully' }
            )
            refetchOrders()
        } catch (error) {
            toast({ title: 'Error updating order status' })
        }
    }

    const handleOrderSelect = (orderId: string) => {
        setSelectedOrderId(orderId)
        setSelectedTab(2) // Switch to Order Details tab
    }

    // Sample data for demonstration
    const sampleOrders = [
        { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', total: 99.99, status: 'Processing', createdAt: '2023-06-01T10:00:00Z' },
        { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', total: 149.99, status: 'Shipped', createdAt: '2023-06-02T11:30:00Z' },
        { id: '3', orderNumber: 'ORD-003', customer: 'Bob Johnson', total: 79.99, status: 'Delivered', createdAt: '2023-06-03T09:15:00Z' },
    ]

    const sampleOrderDetails = {
        id: '1',
        orderNumber: 'ORD-001',
        customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
        },
        shippingAddress: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'USA',
        },
        items: [
            { id: '1', name: 'Product A', quantity: 2, price: 29.99 },
            { id: '2', name: 'Product B', quantity: 1, price: 39.99 },
        ],
        total: 99.97,
        tax: 8.00,
        shippingCost: 5.00,
        status: 'Processing',
        createdAt: '2023-06-01T10:00:00Z',
        shipments: [
            { id: '1', trackingNumber: 'TRACK-001', courier: 'FastTrack Logistics', status: 'In Transit' },
        ],
    }

    const orders = ordersData?.orders || sampleOrders
    const orderDetails = orderDetailsData?.orderDetails || sampleOrderDetails

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                        Order Management
                    </span>
                </h1>
                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-8">
                        {['Import Orders', 'Order List', 'Order Details'].map((tab, index) => (
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
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="order-import"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <OrderImport onImport={handleImportOrders} />
                                </motion.div>
                            </AnimatePresence>
                        </Tab.Panel>
                        <Tab.Panel>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="order-list"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <OrderList
                                        orders={orders}
                                        loading={ordersLoading}
                                        // error={ordersError}
                                        onStatusUpdate={handleUpdateOrderStatus}
                                        onOrderSelect={handleOrderSelect}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </Tab.Panel>
                        <Tab.Panel>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="order-details"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <OrderDetails
                                        order={orderDetails}
                                        loading={orderDetailsLoading}
                                        // error={orderDetailsError}
                                        onStatusUpdate={handleUpdateOrderStatus}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}