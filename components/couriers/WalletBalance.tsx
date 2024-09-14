import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Wallet } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface WalletBalanceProps {
    data: {
        balance: number
    }
    onAddFunds: (amount: number) => void
}

export default function WalletBalance({ data, onAddFunds }: WalletBalanceProps) {
    const [amount, setAmount] = useState('')

    const handleAddFunds = () => {
        const numAmount = parseFloat(amount)
        if (!isNaN(numAmount) && numAmount > 0) {
            onAddFunds(numAmount)
            setAmount('')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 mb-6"
        >
            <h2 className="text-2xl font-bold">Wallet Balance</h2>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Wallet className="h-6 w-6 mr-2" />
                        Current Balance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold mb-4">${data.balance.toFixed(2)}</div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add Funds</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Funds to Wallet</DialogTitle>
                                <DialogDescription>
                                    Enter the amount you want to add to your wallet.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">
                                        Amount
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="col-span-3"
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddFunds}>Add Funds</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </motion.div>
    )
}