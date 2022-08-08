"use client"
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye } from 'lucide-react'

interface OrderListProps {
    orders: any[]
    loading: boolean
    error?: any
    onStatusUpdate: (orderId: string, newStatus: string) => void
    onOrderSelect: (orderId: string) => void
}

export default function OrderList({ orders, loading, error, onStatusUpdate, onOrderSelect }: OrderListProps) {
    if (loading) return <div className="text-center">Loading orders...</div>
    if (error) return <div className="text-center text-red-500">Error loading orders. Please try again.</div>

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-xl rounded-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => onOrderSelect(order.id)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => onStatusUpdate(order.id, 'Processing')}>
                                            Mark as Processing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onStatusUpdate(order.id, 'Shipped')}>
                                            Mark as Shipped
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onStatusUpdate(order.id, 'Delivered')}>
                                            Mark as Delivered
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}

function getStatusVariant(status: string) {
    switch (status) {
        case 'Processing':
            return 'destructive'
        case 'Shipped':
            return 'outline'
        case 'Delivered':
            return 'default'
        default:
            return 'secondary'
    }
}