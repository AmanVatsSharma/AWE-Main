'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Tab } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ADD_FUNDS_TO_WALLET, ADD_PAYMENT_METHOD, GET_BILLING_HISTORY, GET_PAYMENT_METHODS, GET_SUBSCRIPTION_DATA, GET_WALLET_DATA, REMOVE_PAYMENT_METHOD, UPDATE_SUBSCRIPTION } from '@/ApolloClient/CourierQueries'
import { toast } from '@/components/ui/use-toast'
import SubscriptionPlans from '@/components/couriers/SubscriptionPlans'
import BillingHistory from '@/components/couriers/BillingHistory'
import PaymentMethods from '@/components/couriers/PaymentMethods'
import WalletBalance from '@/components/couriers/WalletBalance'
import WalletHistory from '@/components/couriers/WalletHistory'

export default function BillingAndSubscription() {
    const [selectedTab, setSelectedTab] = useState(0)
    const { theme, setTheme } = useTheme()

    const { loading: subLoading, error: subError, data: subData } = useQuery(GET_SUBSCRIPTION_DATA)
    const { loading: billLoading, error: billError, data: billData } = useQuery(GET_BILLING_HISTORY)
    const { loading: paymentLoading, error: paymentError, data: paymentData } = useQuery(GET_PAYMENT_METHODS)
    const { loading: walletLoading, error: walletError, data: walletData } = useQuery(GET_WALLET_DATA)

    const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION)
    const [addPaymentMethod] = useMutation(ADD_PAYMENT_METHOD)
    const [removePaymentMethod] = useMutation(REMOVE_PAYMENT_METHOD)
    const [addFundsToWallet] = useMutation(ADD_FUNDS_TO_WALLET)

    const handleUpdateSubscription = async (planId: string) => {
        try {
            await updateSubscription({ variables: { planId } })
            toast({title:'Subscription updated successfully'})
        } catch (error) {
            toast({title:'Failed to update subscription', variant: "destructive"})
        }
    }

    const handleAddPaymentMethod = async (paymentMethod: any) => {
        try {
            await addPaymentMethod({ variables: { paymentMethod } })
            toast({title: 'Payment method added successfully', variant: "destructive"})
        } catch (error) {
            toast({title:'Failed to add payment method', variant: "destructive"})
        }
    }

    const handleRemovePaymentMethod = async (paymentMethodId: string) => {
        try {
            await removePaymentMethod({ variables: { paymentMethodId } })
            toast({title:'Payment method removed successfully'})
        } catch (error) {
            toast({title: 'Failed to remove payment method', variant: "destructive"})
        }
    }

    const handleAddFunds = async (amount: number) => {
        try {
            await addFundsToWallet({ variables: { amount } })
            toast({title: `$${amount} added to wallet successfully`})
        } catch (error) {
            toast({title: 'Failed to add funds to wallet', variant: "destructive"})
        }
    }

    // Sample data for demonstration
    const sampleSubscriptionData = {
        currentPlan: 'pro',
        plans: [
            { id: 'basic', name: 'Basic', price: 9.99, features: ['100 shipments/month', 'Email support', 'Basic analytics'] },
            { id: 'pro', name: 'Pro', price: 29.99, features: ['500 shipments/month', 'Priority support', 'Advanced analytics', 'API access'] },
            { id: 'enterprise', name: 'Enterprise', price: 99.99, features: ['Unlimited shipments', '24/7 support', 'Custom analytics', 'Dedicated account manager'] },
        ],
    }

    const sampleBillingHistory = [
        { id: '1', date: '2023-06-01', amount: 29.99, status: 'Paid', description: 'Pro Plan - June 2023' },
        { id: '2', date: '2023-05-01', amount: 29.99, status: 'Paid', description: 'Pro Plan - May 2023' },
        { id: '3', date: '2023-04-01', amount: 29.99, status: 'Paid', description: 'Pro Plan - April 2023' },
    ]

    const samplePaymentMethods = [
        { id: '1', type: 'credit_card', last4: '4242', expMonth: 12, expYear: 2024, brand: 'Visa' },
        { id: '2', type: 'paypal', email: 'user@example.com' },
    ]

    const sampleWalletData = {
        balance: 150.00,
        transactions: [
            { id: '1', date: '2023-06-15', amount: 50.00, type: 'deposit', description: 'Added funds' },
            { id: '2', date: '2023-06-10', amount: -25.00, type: 'withdrawal', description: 'Service fee' },
            { id: '3', date: '2023-06-05', amount: 100.00, type: 'deposit', description: 'Refund' },
        ],
    }

    const subscriptionData = subData?.subscriptionData || sampleSubscriptionData
    const billingHistory = billData?.billingHistory || sampleBillingHistory
    const paymentMethods = paymentData?.paymentMethods || samplePaymentMethods
    const finalWalletData = walletData?.walletData || sampleWalletData

    const isLoading = subLoading || billLoading || paymentLoading || walletLoading

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-primary">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Billing and Subscription
                        </span>
                    </h1>
                    <Button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        variant="outline"
                    >
                        Toggle Theme
                    </Button>
                </div>

                {isLoading ? (
                    <Card className="w-full h-[600px] flex items-center justify-center">
                        <CardContent>
                            <Loader2 className="h-16 w-16 animate-spin text-primary" />
                            <p className="mt-4 text-lg font-semibold text-primary">Loading billing information...</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                        <Tab.List className="flex p-1 space-x-1 bg-secondary/20 rounded-xl mb-8">
                            {['Subscription Plans', 'Billing History', 'Payment Methods', 'Wallet'].map((tab, index) => (
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
                                    <SubscriptionPlans key="subscription" data={subscriptionData} onUpdateSubscription={handleUpdateSubscription} />,
                                    <BillingHistory key="billing" data={billingHistory} />,
                                    <PaymentMethods key="payment" data={paymentMethods} onAddPaymentMethod={handleAddPaymentMethod} onRemovePaymentMethod={handleRemovePaymentMethod} />,
                                    <div key="wallet">
                                        <WalletBalance data={finalWalletData} onAddFunds={handleAddFunds} />
                                        <WalletHistory data={finalWalletData.transactions} />
                                    </div>,
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