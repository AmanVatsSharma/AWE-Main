import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface WalletHistoryProps {
    data: Array<{
        id: string
        date: string
        amount: number
        type: 'deposit' | 'withdrawal'
        description: string
    }>
}

export default function WalletHistory({ data }: WalletHistoryProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold">Wallet History</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>${Math.abs(transaction.amount).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge className={cn('rounded-sm', transaction.type === 'deposit' && 'bg-green-600')} variant={transaction.type === 'deposit' ? 'default' : 'destructive'}>
                                            {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    )
}