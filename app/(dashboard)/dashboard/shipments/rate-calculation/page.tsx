// 'use client'

// import { useState, useEffect } from 'react'
// import { useQuery, useMutation } from '@apollo/client'
// import { GET_LIVE_RATES, CALCULATE_RATE, GET_SAVED_ADDRESSES, SAVE_ADDRESS } from './graphql/queries'
// import LiveRates from './components/LiveRates'
// import RateCalculator from './components/RateCalculator'
// import ComparisonChart from './components/ComparisonChart'
// import ShippingMap from './components/ShippingMap'
// import SavedAddresses from './components/SavedAddresses'
// import RateHistory from './components/RateHistory'
// import { Tab } from '@headlessui/react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChartBarIcon, CalculatorIcon, MapIcon, ClockIcon } from '@heroicons/react/outline'
// import { PackageDetails, SavedAddress } from './types'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// export default function RateCalculation() {
//     const [packageDetails, setPackageDetails] = useState<PackageDetails>({
//         weight: 1,
//         length: 10,
//         width: 10,
//         height: 10,
//         fromZip: '',
//         toZip: '',
//     })
//     const [selectedTab, setSelectedTab] = useState(0)

//     const { loading: liveRatesLoading, error: liveRatesError, data: liveRatesData, refetch: refetchLiveRates } = useQuery(GET_LIVE_RATES, {
//         variables: packageDetails,
//         skip: !packageDetails.fromZip || !packageDetails.toZip,
//     })

//     const [calculateRate, { loading: calculatingRate, error: calculationError, data: calculatedRateData }] = useMutation(CALCULATE_RATE)

//     const { data: savedAddressesData } = useQuery(GET_SAVED_ADDRESSES)
//     const [saveAddress] = useMutation(SAVE_ADDRESS)

//     const handlePackageDetailsChange = (newDetails: Partial<PackageDetails>) => {
//         setPackageDetails({ ...packageDetails, ...newDetails })
//         if (packageDetails.fromZip && packageDetails.toZip) {
//             refetchLiveRates()
//         }
//     }

//     const handleCalculateRate = async () => {
//         try {
//             await calculateRate({ variables: packageDetails })
//             toast.success('Rate calculated successfully!')
//         } catch (error) {
//             toast.error('Error calculating rate. Please try again.')
//         }
//     }

//     const handleSaveAddress = async (address: SavedAddress) => {
//         try {
//             await saveAddress({ variables: { address } })
//             toast.success('Address saved successfully!')
//         } catch (error) {
//             toast.error('Error saving address. Please try again.')
//         }
//     }

//     useEffect(() => {
//         if (liveRatesError) {
//             toast.error('Error fetching live rates. Please try again.')
//         }
//     }, [liveRatesError])

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
//                         Smart Rate Calculation
//                     </span>
//                 </h1>
//                 <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
//                     <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-8">
//                         {['Live Rates', 'Rate Calculator', 'Shipping Map', 'Rate History'].map((tab, index) => (
//                             <Tab
//                                 key={tab}
//                                 className={({ selected }) =>
//                                     `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
//                    focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
//                    ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
//                                 }
//                             >
//                                 {({ selected }) => (
//                                     <div className="flex items-center justify-center">
//                                         {index === 0 && <ChartBarIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
//                                         {index === 1 && <CalculatorIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
//                                         {index === 2 && <MapIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
//                                         {index === 3 && <ClockIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
//                                         {tab}
//                                     </div>
//                                 )}
//                             </Tab>
//                         ))}
//                     </Tab.List>
//                     <Tab.Panels>
//                         <AnimatePresence mode="wait">
//                             <Tab.Panel
//                                 as={motion.div}
//                                 key="live-rates"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <LiveRates
//                                     packageDetails={packageDetails}
//                                     onPackageDetailsChange={handlePackageDetailsChange}
//                                     loading={liveRatesLoading}
//                                     error={liveRatesError}
//                                     data={liveRatesData}
//                                 />
//                                 {liveRatesData && <ComparisonChart data={liveRatesData.liveRates} />}
//                             </Tab.Panel>
//                             <Tab.Panel
//                                 as={motion.div}
//                                 key="rate-calculator"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <RateCalculator
//                                     packageDetails={packageDetails}
//                                     onPackageDetailsChange={handlePackageDetailsChange}
//                                     onCalculate={handleCalculateRate}
//                                     loading={calculatingRate}
//                                     error={calculationError}
//                                     data={calculatedRateData}
//                                 />
//                             </Tab.Panel>
//                             <Tab.Panel
//                                 as={motion.div}
//                                 key="shipping-map"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <ShippingMap fromZip={packageDetails.fromZip} toZip={packageDetails.toZip} />
//                             </Tab.Panel>
//                             <Tab.Panel
//                                 as={motion.div}
//                                 key="rate-history"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <RateHistory />
//                             </Tab.Panel>
//                         </AnimatePresence>
//                     </Tab.Panels>
//                 </Tab.Group>
//                 <SavedAddresses
//                     savedAddresses={savedAddressesData?.savedAddresses || []}
//                     onSaveAddress={handleSaveAddress}
//                     onSelectAddress={(address) => handlePackageDetailsChange({ fromZip: address.zipCode })}
//                 />
//             </div>
//             <ToastContainer position="bottom-right" autoClose={3000} />
//         </div>
//     )
// }



'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalculatedRate, LiveRate, PackageDetails, SavedAddress } from '@/components/couriers/types'
import SavedAddresses from '@/components/couriers/SavedAddresses'
import RateHistory from '@/components/couriers/RateHistory'
import { toast } from '@/components/ui/use-toast'
import { BarChart, CalculatorIcon, ClockIcon, MapIcon } from 'lucide-react'
import LiveRates from '@/components/couriers/LiveRates'
import ComparisonChart from '@/components/couriers/ComparisonChart'
import RateCalculator from '@/components/couriers/RateCalculator'
import ShippingMap from '@/components/couriers/ShippingMap'

// Sample data (to be replaced with GraphQL queries)
const sampleLiveRates: LiveRate[] = [
    { courier: 'FastShip', rate: 25.99, estimatedDelivery: '2-3 days' },
    { courier: 'QuickPost', rate: 22.50, estimatedDelivery: '3-5 days' },
    { courier: 'SecurePackage', rate: 28.75, estimatedDelivery: '1-2 days' },
]

const sampleSavedAddresses: SavedAddress[] = [
    { name: 'Home', zipCode: '90210' },
    { name: 'Office', zipCode: '10001' },
]

export default function RateCalculation() {
    const [packageDetails, setPackageDetails] = useState<PackageDetails>({
        weight: 1,
        length: 10,
        width: 10,
        height: 10,
        fromZip: '',
        toZip: '',
    })
    const [selectedTab, setSelectedTab] = useState(0)
    const [liveRates, setLiveRates] = useState<LiveRate[]>([])
    const [calculatedRate, setCalculatedRate] = useState<CalculatedRate | null>(null)
    const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(sampleSavedAddresses)

    const handlePackageDetailsChange = (newDetails: Partial<PackageDetails>) => {
        setPackageDetails({ ...packageDetails, ...newDetails })
    }

    const handleCalculateRate = async () => {
        // Simulating API call
        setTimeout(() => {
            const rate: CalculatedRate = {
                rate: Math.random() * 20 + 15,
                estimatedDelivery: '2-4 days',
            }
            setCalculatedRate(rate)
            toast({
                title: "Rate calculated successfully",
                description: ""
            })
            
        }, 1000)
    }

    const handleSaveAddress = (address: SavedAddress) => {
        setSavedAddresses([...savedAddresses, address])
        toast({
            title: "Address saved successfully",
            description: ""
        })
    }

    useEffect(() => {
        // Simulating API call to fetch live rates
        setTimeout(() => {
            setLiveRates(sampleLiveRates)
        }, 1000)
    }, [packageDetails])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                        Smart Rate Calculation
                    </span>
                </h1>
                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-8">
                        {['Live Rates', 'Rate Calculator', 'Shipping Map', 'Rate History'].map((tab, index) => (
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
                                        {index === 0 && <BarChart className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {index === 1 && <CalculatorIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {index === 2 && <MapIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
                                        {index === 3 && <ClockIcon className={`w-5 h-5 mr-2 ${selected ? 'text-blue-500' : 'text-blue-200'}`} />}
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
                                key="live-rates"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <LiveRates
                                    packageDetails={packageDetails}
                                    onPackageDetailsChange={handlePackageDetailsChange}
                                    loading={liveRates.length === 0}
                                    error={null}
                                    data={{ liveRates }}
                                />
                                {liveRates.length > 0 && <ComparisonChart data={liveRates} />}
                            </Tab.Panel>
                            <Tab.Panel
                                as={motion.div}
                                key="rate-calculator"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <RateCalculator
                                    packageDetails={packageDetails}
                                    onPackageDetailsChange={handlePackageDetailsChange}
                                    onCalculate={handleCalculateRate}
                                    loading={false}
                                    error={null}
                                    data={{ calculateRate: calculatedRate }}
                                />
                            </Tab.Panel>
                            <Tab.Panel
                                as={motion.div}
                                key="shipping-map"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ShippingMap fromZip={packageDetails.fromZip} toZip={packageDetails.toZip} />
                            </Tab.Panel>
                            <Tab.Panel
                                as={motion.div}
                                key="rate-history"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <RateHistory />
                            </Tab.Panel>
                        </AnimatePresence>
                    </Tab.Panels>
                </Tab.Group>
                <SavedAddresses
                    savedAddresses={savedAddresses}
                    onSaveAddress={handleSaveAddress}
                    onSelectAddress={(address) => handlePackageDetailsChange({ fromZip: address.zipCode })}
                />
            </div>
        </div>
    )
}