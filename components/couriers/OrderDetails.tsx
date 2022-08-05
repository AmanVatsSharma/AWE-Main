"use client"
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MapPin, Package, Truck } from 'lucide-react'

interface OrderDetailsProps {
    order: any
    loading: boolean
    error?: any
    onStatusUpdate: (orderId: string, newStatus: string) => void
}

export default function OrderDetails({ order, loading, error, onStatusUpdate }: OrderDetailsProps) {
    if (loading) return <div className="text-center">Loading order details...</div>
    if (error) return <div className="text-center text-red-500">Error loading order details. Please try again.</div>

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Order {order.orderNumber}</CardTitle>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold mb-2">Customer Information</h3>
                            <p>{order.customer.name}</p>
                            <p>{order.customer.email}</p>
                            <p>{order.customer.phone}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Separator className="my-4" />
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${order.shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(order.total + order.tax + order.shippingCost).toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Shipments</CardTitle>
                </CardHeader>
                <CardContent>
                    {order.shipments.map((shipment) => (
                        <div key={shipment.id} className="flex items-center space-x-4 mb-4">
                            <Truck className="h-6 w-6 text-blue-500" />
                            <div>
                                <p className="font-semibold">{shipment.courier}</p>
                                <p className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</p>
                                <Badge variant={getStatusVariant(shipment.status)}>{shipment.status}</Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
                <Button onClick={() => onStatusUpdate(order.id, 'Processing')}>
                    <Package className="mr-2 h-4 w-4" />
                    Mark as Processing
                </Button>
                <Button onClick={() => onStatusUpdate(order.id, 'Shipped')}>
                    <Truck className="mr-2 h-4 w-4" />
                    Mark as Shipped
                </Button>
                <Button onClick={() => onStatusUpdate(order.id, 'Delivered')}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Mark as Delivered
                </Button>
            </div>
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