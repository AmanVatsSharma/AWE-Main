import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface PaymentMethodsProps {
    data: Array<{
        id: string
        type: string
        last4?: string
        expMonth?: number
        expYear?: number
        brand?: string
        email?: string
    }>
    onAddPaymentMethod: (paymentMethod: any) => void
    onRemovePaymentMethod: (paymentMethodId: string) => void
}

export default function PaymentMethods({ data, onAddPaymentMethod, onRemovePaymentMethod }: PaymentMethodsProps) {
    const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
    })

    const handleAddPaymentMethod = () => {
        onAddPaymentMethod(newPaymentMethod)
        setIsAddingPaymentMethod(false)
        setNewPaymentMethod({ cardNumber: '', expMonth: '', expYear: '', cvc: '' })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">Payment Methods</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Saved Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.map((method) => (
                            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center">
                                    <CreditCard className="h-6 w-6 mr-2" />
                                    <div>
                                        {method.type === 'credit_card' ? (
                                            <p>{method.brand} ending in {method.last4}</p>
                                        ) : (
                                            <p>{method.email}</p>
                                        )}
                                        {method.expMonth && method.expYear && (
                                            <p className="text-sm text-muted-foreground">Expires {method.expMonth}/{method.expYear}</p>
                                        )}
                                    </div>
                                </div>
                                <Button variant="destructive" size="icon" onClick={() => onRemovePaymentMethod(method.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-4">Add Payment Method</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Payment Method</DialogTitle>
                                <DialogDescription>
                                    Enter your card details to add a new payment method.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cardNumber" className="text-right">
                                        Card Number
                                    </Label>
                                    <Input
                                        id="cardNumber"
                                        value={newPaymentMethod.cardNumber}
                                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cardNumber: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="expMonth" className="text-right">
                                        Expiry Month
                                    </Label>
                                    <Input
                                        id="expMonth"
                                        value={newPaymentMethod.expMonth}
                                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, expMonth: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="expYear" className="text-right">
                                        Expiry Year
                                    </Label>
                                    <Input
                                        id="expYear"
                                        value={newPaymentMethod.expYear}
                                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, expYear: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="cvc" className="text-right">
                                        CVC
                                    </Label>
                                    <Input
                                        id="cvc"
                                        value={newPaymentMethod.cvc}
                                        onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, cvc: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </motion.div>
    )
}