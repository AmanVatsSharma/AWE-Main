import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface SubscriptionPlansProps {
    data: {
        currentPlan: string
        plans: Array<{
            id: string
            name: string
            price: number
            features: string[]
        }>
    }
    onUpdateSubscription: (planId: string) => void
}

export default function SubscriptionPlans({ data, onUpdateSubscription }: SubscriptionPlansProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.plans.map((plan) => (
                    <Card key={plan.id} className={`${plan.id === data.currentPlan ? 'border-primary' : ''}`}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold mb-4">${plan.price.toFixed(2)}<span className="text-sm font-normal">/month</span></div>
                            <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <Check className="h-5 w-5 mr-2 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={() => onUpdateSubscription(plan.id)}
                                disabled={plan.id === data.currentPlan}
                                className="w-full"
                            >
                                {plan.id === data.currentPlan ? 'Current Plan' : 'Upgrade'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </motion.div>
    )
}