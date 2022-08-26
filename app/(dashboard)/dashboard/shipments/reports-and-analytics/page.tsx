'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Tab } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { toast } from '@/components/ui/use-toast'
import ShipmentReports from '@/components/couriers/ShipmentReports'
import FinancialReports from '@/components/couriers/FinancialReports'
import PerformanceAnalytics from '@/components/couriers/PerformanceAnalytics'
import { GET_FINANCIAL_REPORTS, GET_PERFORMANCE_ANALYTICS, GET_SHIPMENT_REPORTS } from '@/ApolloClient/CourierQueries'

const ReportsAndAnalytics = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-12-31' })
    const [isLoading, setIsLoading] = useState(true)
    const { theme, setTheme } = useTheme()

    const { loading: shipmentLoading, error: shipmentError, data: shipmentData, refetch: refetchShipment } = useQuery(GET_SHIPMENT_REPORTS, {
        variables: dateRange,
    })

    const { loading: financialLoading, error: financialError, data: financialData, refetch: refetchFinancial } = useQuery(GET_FINANCIAL_REPORTS, {
        variables: dateRange,
    })

    const { loading: performanceLoading, error: performanceError, data: performanceData, refetch: refetchPerformance } = useQuery(GET_PERFORMANCE_ANALYTICS, {
        variables: dateRange,
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const handleDateRangeChange = (newDateRange) => {
        setDateRange(newDateRange)
        refetchShipment(newDateRange)
        refetchFinancial(newDateRange)
        refetchPerformance(newDateRange)
        toast({title: 'Reports updated with new date range'})
    }

    const handleRefresh = () => {
        setIsLoading(true)
        refetchShipment()
        refetchFinancial()
        refetchPerformance()
        toast({title:'Reports refreshed successfully'})
        setTimeout(() => setIsLoading(false), 1000)
    }

    const handleExport = () => {
        // Implement export functionality (e.g., generate PDF or CSV)
        toast({title: 'Reports exported successfully'})
    }

    // Sample data for demonstration
    const sampleShipmentData = {
        totalShipments: 15000,
        totalCost: 750000,
        averageCostPerShipment: 50,
        shipmentsByMonth: [
            { month: 'Jan', shipments: 1000 },
            { month: 'Feb', shipments: 1200 },
            { month: 'Mar', shipments: 1500 },
            { month: 'Apr', shipments: 1300 },
            { month: 'May', shipments: 1400 },
            { month: 'Jun', shipments: 1600 },
        ],
        shipmentsByType: [
            { type: 'Standard', count: 10000 },
            { type: 'Express', count: 4000 },
            { type: 'Overnight', count: 1000 },
        ],
    }

    const sampleFinancialData = {
        totalRevenue: 2000000,
        totalExpenses: 1500000,
        netProfit: 500000,
        revenueByMonth: [
            { month: 'Jan', revenue: 150000 },
            { month: 'Feb', revenue: 160000 },
            { month: 'Mar', revenue: 180000 },
            { month: 'Apr', revenue: 170000 },
            { month: 'May', revenue: 190000 },
            { month: 'Jun', revenue: 200000 },
        ],
        expenseCategories: [
            { category: 'Salaries', amount: 800000 },
            { category: 'Fuel', amount: 300000 },
            { category: 'Maintenance', amount: 200000 },
            { category: 'Insurance', amount: 150000 },
            { category: 'Other', amount: 50000 },
        ],
    }

    const samplePerformanceData = {
        onTimeDeliveryRate: 0.95,
        averageDeliveryTime: 2.3,
        customerSatisfactionScore: 4.7,
        deliverySuccessRate: 0.99,
        performanceByMonth: [
            { month: 'Jan', onTimeRate: 0.94, avgDeliveryTime: 2.4, satisfaction: 4.6 },
            { month: 'Feb', onTimeRate: 0.95, avgDeliveryTime: 2.3, satisfaction: 4.7 },
            { month: 'Mar', onTimeRate: 0.96, avgDeliveryTime: 2.2, satisfaction: 4.8 },
            { month: 'Apr', onTimeRate: 0.95, avgDeliveryTime: 2.3, satisfaction: 4.7 },
            { month: 'May', onTimeRate: 0.97, avgDeliveryTime: 2.1, satisfaction: 4.9 },
            { month: 'Jun', onTimeRate: 0.98, avgDeliveryTime: 2.0, satisfaction: 4.9 },
        ],
    }

    // const shipmentReports = shipmentData?.shipmentReports || sampleShipmentData
    // const financialReports = financialData?.financialReports || sampleFinancialData
    // const performanceAnalytics = performanceData?.performanceAnalytics || samplePerformanceData

    const shipmentReports = sampleShipmentData
    const financialReports = sampleFinancialData
    const performanceAnalytics = samplePerformanceData

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-primary">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Reports and Analytics
                        </span>
                    </h1>
                    <div className="flex items-center space-x-4">
                        <DateRangePicker
                            dateRange={dateRange}
                            onDateRangeChange={handleDateRangeChange}
                        />
                        <Button onClick={handleRefresh} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Refresh'}
                        </Button>
                        <Button onClick={handleExport} variant="outline">Export</Button>
                        <Button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            variant="outline"
                        >
                            Toggle Theme
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <Card className="w-full h-[600px] flex items-center justify-center">
                        <CardContent>
                            <Loader2 className="h-16 w-16 animate-spin text-primary" />
                            <p className="mt-4 text-lg font-semibold text-primary">Loading reports...</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                        <Tab.List className="flex p-1 space-x-1 bg-secondary/20 rounded-xl mb-8">
                            {['Shipment Reports', 'Financial Reports', 'Performance Analytics'].map((tab, index) => (
                                <Tab
                                    key={tab}
                                    className={({ selected }) =>
                                        `w-full py-2.5 text-sm leading-5 font-medium rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-secondary ring-opacity-60 transition-all
                     ${selected ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:bg-secondary/40 hover:text-primary'}`
                                    }
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            <AnimatePresence mode="wait">
                                {[
                                    <ShipmentReports 
                                    key="shipment" 
                                    data={shipmentReports} 
                                    loading={shipmentLoading} 
                                    // error={shipmentError} 
                                    />,
                                    <FinancialReports 
                                    key="financial" 
                                    data={financialReports} 
                                    loading={financialLoading} 
                                    // error={financialError} 
                                    />,
                                    <PerformanceAnalytics 
                                    key="performance" 
                                    data={performanceAnalytics} 
                                    loading={performanceLoading} 
                                    // error={performanceError} 
                                    />,
                                ].map((component, index) => (
                                    <Tab.Panel key={index} as={motion.div}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {component}
                                    </Tab.Panel>
                                ))}
                            </AnimatePresence>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </div>
    )
}

export default ReportsAndAnalytics;