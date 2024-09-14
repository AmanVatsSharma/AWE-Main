// "use client"

// import React, { useState } from "react"
// import { format } from "date-fns"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { Separator } from "@/components/ui/separator"
// import { Progress } from "@/components/ui/progress"
// import {
//     AlertCircle,
//     ArrowUpDown,
//     Check,
//     ChevronDown,
//     CreditCard,
//     Edit,
//     MoreHorizontal,
//     Package,
//     RefreshCw,
//     Send,
//     Truck,
//     Printer,
//     X,
//     BarChart2,
//     DollarSign,
//     ShoppingCart,
//     User,
//     FileText,
//     MessageSquare,
//     Paperclip,
//     Loader2Icon,
// } from "lucide-react"
// import { useQuery } from "@apollo/client"
// import { GET_ORDER_QUERY } from "@/ApolloClient/orderQueries"

// // Mock data for a single order
// const SampleOrderData = {
//     id: "ORD-001",
//     customer: {
//         firstName: "John",
//         lastName: "Doe",
//         email: "john.doe@example.com",
//         phoneNumber: "+1 (555) 123-4567"
//     },
//     createdAt: "2024-09-05T10:30:00Z",
//     status: "Processing",
//     orderItems: [
//         {
//             id: 1,
//             product: {
//                 name: "Premium Wireless Headphones",
//                 variants: {
//                     sku: "WH-PRO-001",
//                 },
//                 stockQuantity: 1,
//                 price: 199.99
//             }
//         },
//         { id: 2, name: "Bluetooth Speaker", sku: "BS-001", quantity: 2, price: 129.99 },
//     ],
//     subtotal: 459.97,
//     tax: 36.80,
//     shippingFees: 10.00,
//     discount: 10.00,
//     total: 471.77,
//     coupon{
//         code: "testcoupon123"
//         discountValue: 50
//       },
//     paymentMethod: "Credit Card (**** 1234)",
//     shippingAddress: {
//         address: "123 Main St",
//         landmark: "near school",
//         city: "Anytown",
//         state: "CA",
//         pincode: "12345",
//     },
//     tags:[ {
//         name: "Electronics"
//       }, {
//         name: "Clothings"
//       }],
// }

// // Mock data for order timeline
// const orderTimeline = [
//     { date: "2024-09-05T09:00:00Z", status: "Order Placed", description: "Customer placed the order" },
//     { date: "2024-09-05T10:30:00Z", status: "Payment Confirmed", description: "Payment successfully processed" },
//     { date: "2024-09-05T14:00:00Z", status: "Processing", description: "Order is being prepared for shipment" },
// ]

// export default function EnhancedOrderDetailsPage() {
//     const [order, setOrder] = useState(SampleOrderData)
//     // const { loading, error, data: orderData } = useQuery(GET_ORDER_QUERY, {
//     //     variables: { id: 16 },
//     // });
//     // const { order } = orderData ?? SampleOrderData;

//     const [isEditing, setIsEditing] = useState(false)
//     const [editedOrder, setEditedOrder] = useState(order)
//     const [activeTab, setActiveTab] = useState("overview")
//     const [newTag, setNewTag] = useState("")
//     const [showSplitOrderDialog, setShowSplitOrderDialog] = useState(false)
//     const [splitQuantities, setSplitQuantities] = useState({})
//     const [attachments, setAttachments] = useState([])
//     const [messages, setMessages] = useState([
//         { id: 1, sender: "Customer", content: "When will my order be shipped?", timestamp: "2024-09-05T11:30:00Z" },
//         { id: 2, sender: "Support", content: "Your order is being processed and will be shipped within 2 business days.", timestamp: "2024-09-05T12:15:00Z" },
//     ])
//     const [newMessage, setNewMessage] = useState("")



//     const handleEdit = () => {
//         setIsEditing(true)
//         setEditedOrder(order)
//     }

//     const handleSave = () => {
//         setOrder(editedOrder)
//         setIsEditing(false)
//     }

//     const handleCancel = () => {
//         setIsEditing(false)
//         setEditedOrder(order)
//     }

//     const handleInputChange = (e, field) => {
//         setEditedOrder({ ...editedOrder, [field]: e.target.value })
//     }

//     const handleStatusChange = (newStatus) => {
//         setEditedOrder({ ...editedOrder, status: newStatus })
//     }

//     const handleItemQuantityChange = (itemId, newQuantity) => {
//         const updatedItems = editedOrder.orderItems.map(item =>
//             item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
//         )
//         const newSubtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         const newTax = newSubtotal * 0.08 // Assuming 8% tax rate
//         const newTotal = newSubtotal + newTax + editedOrder.shipping - editedOrder.discount - editedOrder.giftCard
//         setEditedOrder({
//             ...editedOrder,
//             items: updatedItems,
//             subtotal: newSubtotal,
//             tax: newTax,
//             total: newTotal
//         })
//     }

//     const handleRemoveItem = (itemId) => {
//         const updatedItems = editedOrder.orderItems.filter(item => item.id !== itemId)
//         const newSubtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//         const newTax = newSubtotal * 0.08 // Assuming 8% tax rate
//         const newTotal = newSubtotal + newTax + editedOrder.shipping - editedOrder.discount - editedOrder.giftCard
//         setEditedOrder({
//             ...editedOrder,
//             items: updatedItems,
//             subtotal: newSubtotal,
//             tax: newTax,
//             total: newTotal
//         })
//     }

//     const handleAddTag = () => {
//         if (newTag && !editedOrder.tags.includes(newTag)) {
//             setEditedOrder({
//                 ...editedOrder,
//                 tags: [...editedOrder.tags, newTag]
//             })
//             setNewTag("")
//         }
//     }

//     const handleRemoveTag = (tag) => {
//         setEditedOrder({
//             ...editedOrder,
//             tags: editedOrder.tags.filter(t => t !== tag)
//         })
//     }

//     const handleSplitOrder = () => {
//         // Implement the logic to split the order based on splitQuantities
//         console.log("Splitting order with quantities:", splitQuantities)
//         setShowSplitOrderDialog(false)
//     }

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0]
//         if (file) {
//             setAttachments([...attachments, { name: file.name, size: file.size }])
//         }
//     }

//     const handleSendMessage = () => {
//         if (newMessage.trim()) {
//             setMessages([
//                 ...messages,
//                 { id: messages.length + 1, sender: "Support", content: newMessage, timestamp: new Date().toISOString() }
//             ])
//             setNewMessage("")
//         }
//     }

//     // if (loading) return <Loader2Icon/>
//     // if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div className="container mx-auto py-10">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//                 <div>
//                     <h1 className="text-3xl font-bold">Order {order.id}</h1>
//                     <p className="text-sm text-muted-foreground">Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-4 md:mt-0">
//                     {isEditing ? (
//                         <>
//                             <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
//                                 <Check className="mr-2 h-4 w-4" /> Save Changes
//                             </Button>
//                             <Button onClick={handleCancel} variant="outline">
//                                 <X className="mr-2 h-4 w-4" /> Cancel
//                             </Button>
//                         </>
//                     ) : (
//                         <Button onClick={handleEdit}>
//                             <Edit className="mr-2 h-4 w-4" /> Edit Order
//                         </Button>
//                     )}
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="outline">
//                                 More Actions <ChevronDown className="ml-2 h-4 w-4" />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuItem>
//                                 <Send className="mr-2 h-4 w-4" /> Send Invoice
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                                 <RefreshCw className="mr-2 h-4 w-4" /> Refund Order
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => setShowSplitOrderDialog(true)}>
//                                 <ArrowUpDown className="mr-2 h-4 w-4" /> Split Order
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-red-600">
//                                 <AlertCircle className="mr-2 h-4 w-4" /> Cancel Order
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </div>

//             <div className="grid gap-6 md:grid-cols-3">
//                 <div className="md:col-span-2">
//                     <Tabs value={activeTab} onValueChange={setActiveTab}>
//                         <TabsList>
//                             <TabsTrigger value="overview">Overview</TabsTrigger>
//                             <TabsTrigger value="items">Items</TabsTrigger>
//                             <TabsTrigger value="customer">Customer</TabsTrigger>
//                             <TabsTrigger value="timeline">Timeline</TabsTrigger>
//                             <TabsTrigger value="financials">Financials</TabsTrigger>
//                             <TabsTrigger value="communication">Communication</TabsTrigger>
//                         </TabsList>
//                         <TabsContent value="overview">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Order Overview</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="grid gap-4">
//                                         <div className="flex justify-between items-center">
//                                             <span className="font-medium">Status:</span>
//                                             {isEditing ? (
//                                                 <Select
//                                                     value={editedOrder.status}
//                                                     onValueChange={handleStatusChange}
//                                                 >
//                                                     <SelectTrigger className="w-[180px]">
//                                                         <SelectValue placeholder="Select status" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="Pending">Pending</SelectItem>
//                                                         <SelectItem value="Processing">Processing</SelectItem>
//                                                         <SelectItem value="Shipped">Shipped</SelectItem>
//                                                         <SelectItem value="Delivered">Delivered</SelectItem>
//                                                         <SelectItem value="Cancelled">Cancelled</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             ) : (
//                                                 <Badge>{order.status}</Badge>
//                                             )}
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="font-medium">Payment Method:</span>
//                                             <span>{order.paymentMethod}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="font-medium">Subtotal:</span>
//                                             <span>${order.subtotal.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="font-medium">Tax:</span>
//                                             <span>${order.tax.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="font-medium">Shipping:</span>
//                                             <span>${order.shipping.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="font-medium">Discount:</span>
//                                             <span>-${order.discount.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="font-medium">Gift Card:</span>
//                                             <span>-${order.giftCard.toFixed(2)}</span>
//                                         </div>
//                                         <Separator />
//                                         <div className="flex justify-between font-bold">
//                                             <span>Total:</span>
//                                             <span>${order.total.toFixed(2)}</span>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                         <TabsContent value="items">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Order Items</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <Table>
//                                         <TableHeader>
//                                             <TableRow>
//                                                 <TableHead>Product</TableHead>
//                                                 <TableHead>SKU</TableHead>
//                                                 <TableHead className="text-right">Quantity</TableHead>
//                                                 <TableHead className="text-right">Price</TableHead>
//                                                 <TableHead className="text-right">Total</TableHead>
//                                                 {isEditing && <TableHead className="text-right">Actions</TableHead>}
//                                             </TableRow>
//                                         </TableHeader>
//                                         <TableBody>
//                                             {(isEditing ? editedOrder.orderItems : order.orderItems).map((item) => (
//                                                 <TableRow key={item.id}>
//                                                     <TableCell>{item.product?.name}</TableCell>
//                                                     <TableCell>{item.product?.variants?.sku}</TableCell>
//                                                     <TableCell className="text-right">
//                                                         {isEditing ? (
//                                                             <Input
//                                                                 type="number"
//                                                                 value={item.product?.stockQuantity}
//                                                                 onChange={(e) => handleItemQuantityChange(item.id, e.target.value)}
//                                                                 className="w-20 text-right"
//                                                             />
//                                                         ) : (
//                                                             item.product?.stockQuantity
//                                                         )}
//                                                     </TableCell>
//                                                     <TableCell className="text-right">${item.product?.price.toFixed(2)}</TableCell>
//                                                     <TableCell className="text-right">${(item.product?.stockQuantity * item.product?.price).toFixed(2)}</TableCell>
//                                                     {isEditing && (
//                                                         <TableCell className="text-right">
//                                                             <Button
//                                                                 variant="ghost"
//                                                                 size="sm"
//                                                                 onClick={() => handleRemoveItem(item.id)}
//                                                             >
//                                                                 <X className="h-4 w-4" />
//                                                             </Button>
//                                                         </TableCell>
//                                                     )}
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                         <TabsContent value="customer">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Customer Information</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="grid grid-cols-2 gap-3">
//                                             <Label htmlFor="customer-firstName">First Name</Label>
//                                             <Label htmlFor="customer-lastName">Last Name</Label>
//                                             <Input
//                                                 id="customer-firstName"
//                                                 value={isEditing ? editedOrder.customer.firstName : order.customer.firstName}
//                                                 onChange={(e) => handleInputChange(e, 'customer.firstName')}
//                                                 disabled={!isEditing}
//                                             />
//                                             <Input
//                                                 id="customer-lastName"
//                                                 value={isEditing ? editedOrder.customer.lastName : order.customer.lastName}
//                                                 onChange={(e) => handleInputChange(e, 'customer.lastName')}
//                                                 disabled={!isEditing}
//                                             />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="customer-email">Email</Label>
//                                             <Input
//                                                 id="customer-email"
//                                                 value={isEditing ? editedOrder.customer.email : order.customer.email}
//                                                 onChange={(e) => handleInputChange(e, 'customer.email')}
//                                                 disabled={!isEditing}
//                                             />
//                                         </div>
//                                         <div>
//                                             <Label htmlFor="customer-phone">Phone</Label>
//                                             <Input
//                                                 id="customer-phone"
//                                                 value={isEditing ? editedOrder.customer.phoneNumber : order.customer.phoneNumber}
//                                                 onChange={(e) => handleInputChange(e, 'customer.phone')}
//                                                 disabled={!isEditing}
//                                             />
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                         <TabsContent value="timeline">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Order Timeline</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <ScrollArea className="h-[300px]">
//                                         {orderTimeline.map((event, index) => (
//                                             <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
//                                                 <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
//                                                 <div className="space-y-1">
//                                                     <p className="text-sm font-medium">{event.status}</p>
//                                                     <p className="text-sm text-muted-foreground">{format(new Date(event.date), "MMM d, yyyy 'at' h:mm a")}</p>
//                                                     <p className="text-sm text-muted-foreground">{event.description}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </ScrollArea>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                         <TabsContent value="financials">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Financial Breakdown</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="flex justify-between">
//                                             <span>Subtotal:</span>
//                                             <span>${order.subtotal.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span>Tax:</span>
//                                             <span>${order.tax.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span>Shipping:</span>
//                                             <span>${order.shipping.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span>Discount:</span>
//                                             <span>-${order.discount.toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span>Gift Card:</span>
//                                             <span>-${order.giftCard.toFixed(2)}</span>
//                                         </div>
//                                         <Separator />
//                                         <div className="flex justify-between font-bold">
//                                             <span>Total:</span>
//                                             <span>${order.total.toFixed(2)}</span>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                         <TabsContent value="communication">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Customer Communication</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <ScrollArea className="h-[300px] mb-4">
//                                         {messages.map((message) => (
//                                             <div key={message.id} className={`mb-4 ${message.sender === 'Support' ? 'text-right' : ''}`}>
//                                                 <div className={`inline-block p-2 rounded-lg ${message.sender === 'Support' ? 'bg-blue-100' : 'bg-gray-100'}`}>
//                                                     <p className="font-semibold">{message.sender}</p>
//                                                     <p>{message.content}</p>
//                                                     <p className="text-xs text-gray-500">{format(new Date(message.timestamp), "MMM d, yyyy 'at' h:mm a")}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </ScrollArea>
//                                     <div className="flex gap-2">
//                                         <Input
//                                             value={newMessage}
//                                             onChange={(e) => setNewMessage(e.target.value)}
//                                             placeholder="Type your message..."
//                                         />
//                                         <Button onClick={handleSendMessage}>Send</Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                     </Tabs>
//                 </div>

//                 <div className="space-y-6">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Quick Actions</CardTitle>
//                         </CardHeader>
//                         <CardContent className="grid gap-4">
//                             <Button className="w-full">
//                                 <Printer className="mr-2 h-4 w-4" /> Print Invoice
//                             </Button>
//                             <Button className="w-full">
//                                 <Truck className="mr-2 h-4 w-4" /> Update Shipping
//                             </Button>
//                             <Button className="w-full" variant="outline">
//                                 <Send className="mr-2 h-4 w-4" /> Send to Customer
//                             </Button>
//                             <Button className="w-full" variant="outline">
//                                 <CreditCard className="mr-2 h-4 w-4" /> Process Refund
//                             </Button>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Shipping Address</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-2">
//                                 <p>{order.shippingAddress.street}</p>
//                                 <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
//                                 <p>{order.shippingAddress.country}</p>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Tags</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {(isEditing ? editedOrder.tags : order.tags).map((tag) => (
//                                     <Badge key={tag} variant="secondary">
//                                         {tag}
//                                         {isEditing && (
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 className="ml-2 h-4 w-4 p-0"
//                                                 onClick={() => handleRemoveTag(tag)}
//                                             >
//                                                 <X className="h-3 w-3" />
//                                             </Button>
//                                         )}
//                                     </Badge>
//                                 ))}
//                             </div>
//                             {isEditing && (
//                                 <div className="flex gap-2">
//                                     <Input
//                                         placeholder="Add new tag"
//                                         value={newTag}
//                                         onChange={(e) => setNewTag(e.target.value)}
//                                     />
//                                     <Button onClick={handleAddTag}>Add</Button>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Related Orders</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <ul className="space-y-2">
//                                 {order.relatedOrders.map((relatedOrder) => (
//                                     <li key={relatedOrder.id} className="flex justify-between items-center">
//                                         <a href="#" className="text-blue-600 hover:underline">{relatedOrder.id}</a>
//                                         <span>${relatedOrder.total.toFixed(2)}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Order Statistics</CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div>
//                                 <div className="flex justify-between mb-1">
//                                     <span>Order Progress</span>
//                                     <span>75%</span>
//                                 </div>
//                                 <Progress value={75} />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="flex flex-col">
//                                     <span className="text-sm text-muted-foreground">Total Items</span>
//                                     <span className="text-2xl font-bold">{order.orderItems.reduce((sum, item) => sum + item.product?.stockQuantity, 0)}</span>
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <span className="text-sm text-muted-foreground">Order Value</span>
//                                     <span className="text-2xl font-bold">${order.total.toFixed(2)}</span>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Attachments</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="space-y-2">
//                                 {attachments.map((file, index) => (
//                                     <div key={index} className="flex items-center justify-between">
//                                         <div className="flex items-center">
//                                             <FileText className="mr-2 h-4 w-4" />
//                                             <span>{file.name}</span>
//                                         </div>
//                                         <span className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             <label htmlFor="file-upload" className="cursor-pointer">
//                                 <div className="mt-4 flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
//                                     <div className="text-center">
//                                         <Paperclip className="mx-auto h-8 w-8 text-gray-400" />
//                                         <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
//                                     </div>
//                                 </div>
//                                 <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
//                             </label>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>

//             <Card className="mt-6">
//                 <CardHeader>
//                     <CardTitle>Order Notes</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Textarea
//                         placeholder="Add notes about this order..."
//                         className="min-h-[100px]"
//                     />
//                     <Button className="mt-2">Save Note</Button>
//                 </CardContent>
//             </Card>

//             <Dialog open={showSplitOrderDialog} onOpenChange={setShowSplitOrderDialog}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Split Order</DialogTitle>
//                         <DialogDescription>
//                             Specify the quantities for each item to split into a new order.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="space-y-4">
//                         {order.orderItems.map((item) => (
//                             <div key={item.id} className="flex items-center justify-between">
//                                 <span>{item.product?.name}</span>
//                                 <Input
//                                     type="number"
//                                     placeholder="Quantity"
//                                     className="w-24"
//                                     min="0"
//                                     max={item.product?.stockQuantity}
//                                     onChange={(e) => setSplitQuantities({ ...splitQuantities, [item.id]: e.target.value })}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <DialogFooter>
//                         <Button onClick={() => setShowSplitOrderDialog(false)} variant="outline">Cancel</Button>
//                         <Button onClick={handleSplitOrder}>Split Order</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }


"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { useQuery, useMutation, gql } from "@apollo/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
    AlertCircle,
    ArrowUpDown,
    Check,
    ChevronDown,
    CreditCard,
    Edit,
    MoreHorizontal,
    Package,
    RefreshCw,
    Send,
    Truck,
    Printer,
    X,
    BarChart2,
    DollarSign,
    ShoppingCart,
    User,
    FileText,
    MessageSquare,
    Paperclip,
    Loader2,
} from "lucide-react"
import { GET_ORDER_PAGE_QUERY, UPDATE_ORDER_MUTATION, UPDATE_ORDER_STATUS } from "@/ApolloClient/orderQueries"
import { useParams } from "next/navigation"
import AdvancedLoader from "@/components/common/AdvancedLoader"
import AdvancedError from "@/components/common/AdvancedError"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"


export default function EnhancedOrderDetailsPage() {
    const params = useParams()
    const [activeTab, setActiveTab] = useState("overview")
    const [isEditing, setIsEditing] = useState(false)
    const [editedOrder, setEditedOrder] = useState(null)
    const [newTag, setNewTag] = useState("")
    const [showSplitOrderDialog, setShowSplitOrderDialog] = useState(false)
    const [splitQuantities, setSplitQuantities] = useState({})
    const orderId = Array.isArray(params?.orderId) ? parseInt(params.orderId[0]) : parseInt(params?.orderId);

    const { loading, error, data } = useQuery(GET_ORDER_PAGE_QUERY, {
        variables: { id: orderId },
    })

    const [updateOrder] = useMutation(UPDATE_ORDER_STATUS)


    const order = data?.order

    const handleEdit = () => {
        setIsEditing(true)
        setEditedOrder({ ...order })
    }

    const handleSave = async () => {
        try {
            // await updateOrder({
            //     variables: {
            //         id: order.id,
            //         input: {
            //             status: editedOrder.status,
            //             customer: {
            //                 firstName: editedOrder.customer.firstName,
            //                 lastName: editedOrder.customer.lastName,
            //                 email: editedOrder.customer.email,
            //                 phoneNumber: editedOrder.customer.phoneNumber,
            //             },
            //             orderItems: editedOrder.orderItems.map(item => ({
            //                 id: item.id,
            //                 product: {
            //                     stockQuantity: item.product.stockQuantity,
            //                 },
            //             })),
            //             tags: editedOrder.tags.map(tag => ({ name: tag.name })),
            //         },
            //     },
            // })
            await updateOrder({
                variables: {
                    id: order.id,
                    status: editedOrder.status ?? "PROCESSING",
                },
            },)
            if (data) {
                toast({
                    title: `Status Updated Sucessully!`,
                    variant: "success"
                })
            }
            setIsEditing(false)
        } catch (error) {
            console.error("Error updating order:", error)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditedOrder(null)
    }

    const handleInputChange = (e, field) => {
        setEditedOrder({ ...editedOrder, [field]: e.target.value })
    }

    const handleStatusChange = (newStatus) => {
        setEditedOrder({ ...editedOrder, status: newStatus })
    }

    const handleItemQuantityChange = (itemId, newQuantity) => {
        const updatedItems = editedOrder.orderItems.map(item =>
            item.id === itemId ? { ...item, product: { ...item.product, stockQuantity: parseInt(newQuantity) } } : item
        )
        setEditedOrder({ ...editedOrder, orderItems: updatedItems })
    }

    const handleAddTag = () => {
        if (newTag && !editedOrder.tags.some(tag => tag.name === newTag)) {
            setEditedOrder({
                ...editedOrder,
                tags: [...editedOrder.tags, { name: newTag }]
            })
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagName) => {
        setEditedOrder({
            ...editedOrder,
            tags: editedOrder.tags.filter(tag => tag.name !== tagName)
        })
    }

    if (loading) return <AdvancedLoader />
    if (error) return <AdvancedError message={error.message ?? "A raandom error occured"} />

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-3 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/dashboard/">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/dashboard/orders">Orders</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Order #{orderId}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="pr-8">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">Order {order.id}</h1>
                            <p className="text-sm text-muted-foreground">Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            {isEditing ? (
                                <>
                                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                        <Check className="mr-2 h-4 w-4" /> Save Changes
                                    </Button>
                                    <Button onClick={handleCancel} variant="outline">
                                        <X className="mr-2 h-4 w-4" /> Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleEdit}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit Order
                                </Button>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        More Actions <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Send className="mr-2 h-4 w-4" /> Send Invoice
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <RefreshCw className="mr-2 h-4 w-4" /> Refund Order
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setShowSplitOrderDialog(true)}>
                                        <ArrowUpDown className="mr-2 h-4 w-4" /> Split Order
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                        <AlertCircle className="mr-2 h-4 w-4" /> Cancel Order
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="items">Items</TabsTrigger>
                                    <TabsTrigger value="customer">Customer</TabsTrigger>
                                    <TabsTrigger value="financials">Financials</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Order Overview</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">Status:</span>
                                                    {isEditing ? (
                                                        <Select
                                                            value={editedOrder.status}
                                                            onValueChange={handleStatusChange}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="PENDING">Pending</SelectItem>
                                                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                                                                <SelectItem value="CANCELED">Cancelled</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    ) : (
                                                        <Badge className={cn('p-2  rounded-sm', 
                                                            order.status === 'DELIVERED' && 'bg-green-600',
                                                            order.status === 'CANCELED' && 'bg-red-600',
                                                            order.status === 'SHIPPED' && 'bg-orange-600',
                                                            order.status === 'PROCESSING' && 'bg-blue-600'
                                                        )} >{order.status}</Badge>
                                                    )}
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Payment Method:</span>
                                                    <span>{order.paymentMethod}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Subtotal:</span>
                                                    <span>${order.subtotal?.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Tax:</span>
                                                    <span>${order.tax?.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Shipping:</span>
                                                    <span>${order.shippingFees.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium">Discount:</span>
                                                    <span>-${order.discount.toFixed(2)}</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between font-bold">
                                                    <span>Total:</span>
                                                    <span>${order.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="items">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Order Items</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>SKU</TableHead>
                                                        <TableHead className="text-right">Quantity</TableHead>
                                                        <TableHead className="text-right">Price</TableHead>
                                                        <TableHead className="text-right">Total</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {(isEditing ? editedOrder.orderItems : order.orderItems).map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell className="flex gap-3 items-center capitalize">
                                                                <Image
                                                                    alt={item.product.name}
                                                                    src={item.product?.imageUrl[0]}
                                                                    width={50}
                                                                    height={50}
                                                                    className=""
                                                                />
                                                                {item.product.name}
                                                            </TableCell>
                                                            <TableCell>{item.product.variants?.sku}</TableCell>
                                                            <TableCell className="text-right">
                                                                {isEditing ? (
                                                                    <Input
                                                                        type="number"
                                                                        value={item.product.stockQuantity}
                                                                        onChange={(e) => handleItemQuantityChange(item.id, e.target.value)}
                                                                        className="w-20 text-right"
                                                                    />
                                                                ) : (
                                                                    item.product.stockQuantity
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">${item.product.price.toFixed(2)}</TableCell>
                                                            <TableCell className="text-right">${(item.product.stockQuantity * item.product.price).toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="customer">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Customer Information</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Label htmlFor="customer-firstName">First Name</Label>
                                                    <Label htmlFor="customer-lastName">Last Name</Label>
                                                    <Input
                                                        id="customer-firstName"
                                                        value={isEditing ? editedOrder.customer.firstName : order.customer.firstName}
                                                        onChange={(e) => handleInputChange(e, 'customer.firstName')}
                                                        disabled={!isEditing}
                                                    />
                                                    <Input
                                                        id="customer-lastName"
                                                        value={isEditing ? editedOrder.customer.lastName : order.customer.lastName}
                                                        onChange={(e) => handleInputChange(e, 'customer.lastName')}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="customer-email">Email</Label>
                                                    <Input
                                                        id="customer-email"
                                                        value={isEditing ? editedOrder.customer.email : order.customer.email}
                                                        onChange={(e) => handleInputChange(e, 'customer.email')}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="customer-phone">Phone</Label>
                                                    <Input
                                                        id="customer-phone"
                                                        value={isEditing ? editedOrder.customer.phoneNumber : order.customer.phoneNumber}
                                                        onChange={(e) => handleInputChange(e, 'customer.phoneNumber')}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="financials">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Financial Breakdown</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex justify-between">
                                                    <span>Subtotal:</span>
                                                    <span>${order.subtotal?.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Tax:</span>
                                                    <span>${order.tax?.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Shipping:</span>
                                                    <span>${order.shippingFees.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Discount:</span>
                                                    <span>-${order.discount?.toFixed(2)}</span>
                                                </div>
                                                {order.coupon && (
                                                    <div className="flex justify-between">
                                                        <span>Coupon ({order.coupon?.code}):</span>
                                                        <span>-${order.coupon?.discountValue?.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <Separator />
                                                <div className="flex justify-between font-bold">
                                                    <span>Total:</span>
                                                    <span>${order.total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {order.shippingAddress ?
                                        <div className="space-y-2">
                                            <p>{order.shippingAddress?.address}</p>
                                            <p>{order.shippingAddress?.landmark}</p>
                                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</p>
                                        </div>
                                        : "no shipping address"
                                    }
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {order.tags ?
                                        <>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {(isEditing ? editedOrder.tags : order.tags).map((tag) => (
                                                    <Badge key={tag.name} variant="secondary">
                                                        {tag.name}
                                                        {isEditing && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="ml-2 h-4 w-4 p-0"
                                                                onClick={() => handleRemoveTag(tag.name)}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                    </Badge>
                                                ))}
                                            </div>
                                            {isEditing && (
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Add new tag"
                                                        value={newTag}
                                                        onChange={(e) => setNewTag(e.target.value)}
                                                    />
                                                    <Button onClick={handleAddTag}>Add</Button>
                                                </div>
                                            )}
                                        </>
                                        : "no tags"}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Dialog open={showSplitOrderDialog} onOpenChange={setShowSplitOrderDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Split Order</DialogTitle>
                                <DialogDescription>
                                    Specify the quantities for each item to split into a new order.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <span>{item.product.name}</span>
                                        <Input
                                            type="number"
                                            placeholder="Quantity"
                                            className="w-24"
                                            min="0"
                                            max={item.product.stockQuantity}
                                            onChange={(e) => setSplitQuantities({ ...splitQuantities, [item.id]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button onClick={() => setShowSplitOrderDialog(false)} variant="outline">Cancel</Button>
                                <Button onClick={() => {/* Implement split order logic */ }}>Split Order</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </main>
            </div>
        </div>
    )
}