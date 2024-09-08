// 'use client'

// import { useState, useEffect } from 'react'
// import { useQuery, gql } from '@apollo/client'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Textarea } from "@/components/ui/textarea"
// import { ChevronLeft, ChevronRight, Copy, MoreHorizontal, PenSquare, Plus, Send, TrendingUp, DollarSign, ShoppingCart, Users, Clock, Star } from "lucide-react"
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
// import Link from 'next/link'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// const GET_CUSTOMER_DATA = gql`
//   query GetCustomerData($id: ID!) {
//     customer(id: $id) {
//       id
//       name
//       email
//       phone
//       address {
//         street
//         city
//         postalCode
//         country
//       }
//       orders {
//         id
//         date
//         total
//         status
//       }
//       lifetime_value
//       average_order_value
//       total_orders
//       last_purchase_date
//       customer_segment
//       product_recommendations {
//         id
//         name
//         price
//       }
//     }
//   }
// `

// export default function Component() {
//     const [notes, setNotes] = useState([
//         { id: 1, content: "Customer prefers email communication", date: "2024-08-30" },
//         { id: 2, content: "Interested in new product line", date: "2024-08-29" },
//     ])
//     const [newNote, setNewNote] = useState("")

//     const { loading, error, data } = useQuery(GET_CUSTOMER_DATA, {
//         variables: { id: "customer-123" }, // Replace with actual customer ID
//     })

//     const addNote = () => {
//         if (newNote.trim()) {
//             setNotes([...notes, { id: notes.length + 1, content: newNote, date: new Date().toISOString().split('T')[0] }])
//             setNewNote("")
//         }
//     }

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error: {error.message}</p>

//     const customer = data?.customer || {}

//     const purchaseHistory = [
//         { month: 'Jan', amount: 400 },
//         { month: 'Feb', amount: 300 },
//         { month: 'Mar', amount: 200 },
//         { month: 'Apr', amount: 278 },
//         { month: 'May', amount: 189 },
//         { month: 'Jun', amount: 239 },
//     ]

//     return (
//         <div className="flex min-h-screen w-full flex-col bg-muted/40">
//             <div className="flex flex-col gap-4 p-4 sm:p-8 md:p-12">
//                 <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-0">
//                     <Breadcrumb className="hidden md:flex">
//                         <BreadcrumbList>
//                             <BreadcrumbItem>
//                                 <BreadcrumbLink asChild>
//                                     <Link href="#">Dashboard</Link>
//                                 </BreadcrumbLink>
//                             </BreadcrumbItem>
//                             <BreadcrumbSeparator />
//                             <BreadcrumbItem>
//                                 <BreadcrumbLink asChild>
//                                     <Link href="#">Customers</Link>
//                                 </BreadcrumbLink>
//                             </BreadcrumbItem>
//                             <BreadcrumbSeparator />
//                             <BreadcrumbItem>
//                                 <BreadcrumbPage>Customer Details</BreadcrumbPage>
//                             </BreadcrumbItem>
//                         </BreadcrumbList>
//                     </Breadcrumb>
//                 </header>

//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//                     <div className="flex items-center space-x-4">
//                         <Avatar className="h-12 w-12">
//                             <AvatarImage src="/placeholder.svg?height=50&width=50" alt={customer.name} />
//                             <AvatarFallback>{customer.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <h1 className="text-2xl font-bold">{customer.name}</h1>
//                             <p className="text-sm text-muted-foreground">{customer.address?.city}, {customer.address?.country} • Customer for 9 months</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <Button>Create order</Button>
//                         <Button variant="outline" size="icon">
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="md:col-span-2">
//                         <Tabs defaultValue="overview" className="w-full">
//                             <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
//                                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                                 <TabsTrigger value="orders">Orders</TabsTrigger>
//                                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
//                                 <TabsTrigger value="timeline">Timeline</TabsTrigger>
//                                 <TabsTrigger value="notes">Notes</TabsTrigger>
//                             </TabsList>
//                             <TabsContent value="overview">
//                                 <Card>
//                                     <CardHeader>
//                                         <CardTitle>Customer Overview</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                             <div>
//                                                 <h3 className="font-semibold mb-2">Contact Information</h3>
//                                                 <p>Email: {customer.email}</p>
//                                                 <p>Phone: {customer.phone}</p>
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-semibold mb-2">Address</h3>
//                                                 <p>{customer.name}</p>
//                                                 <p>{customer.address?.street}</p>
//                                                 <p>{customer.address?.city} {customer.address?.postalCode}</p>
//                                                 <p>{customer.address?.country}</p>
//                                             </div>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                                     <Card>
//                                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                                             <CardTitle className="text-sm font-medium">Lifetime Value</CardTitle>
//                                             <DollarSign className="h-4 w-4 text-muted-foreground" />
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="text-2xl font-bold">${customer.lifetime_value}</div>
//                                         </CardContent>
//                                     </Card>
//                                     <Card>
//                                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                                             <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
//                                             <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="text-2xl font-bold">${customer.average_order_value}</div>
//                                         </CardContent>
//                                     </Card>
//                                     <Card>
//                                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                                             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//                                             <Users className="h-4 w-4 text-muted-foreground" />
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="text-2xl font-bold">{customer.total_orders}</div>
//                                         </CardContent>
//                                     </Card>
//                                     <Card>
//                                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                                             <CardTitle className="text-sm font-medium">Last Purchase</CardTitle>
//                                             <Clock className="h-4 w-4 text-muted-foreground" />
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="text-2xl font-bold">{new Date(customer.last_purchase_date).toLocaleDateString()}</div>
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             </TabsContent>
//                             <TabsContent value="orders">
//                                 <Card>
//                                     <CardHeader>
//                                         <CardTitle>Order History</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         {customer.orders && customer.orders.length > 0 ? (
//                                             <table className="w-full">
//                                                 <thead>
//                                                     <tr>
//                                                         <th className="text-left">Order ID</th>
//                                                         <th className="text-left">Date</th>
//                                                         <th className="text-left">Total</th>
//                                                         <th className="text-left">Status</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {customer.orders.map((order) => (
//                                                         <tr key={order.id}>
//                                                             <td>{order.id}</td>
//                                                             <td>{new Date(order.date).toLocaleDateString()}</td>
//                                                             <td>${order.total}</td>
//                                                             <td>{order.status}</td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         ) : (
//                                             <p>This customer hasn't placed any orders yet.</p>
//                                         )}
//                                     </CardContent>
//                                 </Card>
//                             </TabsContent>
//                             <TabsContent value="analytics">
//                                 <Card>
//                                     <CardHeader>
//                                         <CardTitle>Purchase History</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <ResponsiveContainer width="100%" height={300}>
//                                             <BarChart data={purchaseHistory}>
//                                                 <CartesianGrid strokeDasharray="3 3" />
//                                                 <XAxis dataKey="month" />
//                                                 <YAxis />
//                                                 <Tooltip />
//                                                 <Bar dataKey="amount" fill="#8884d8" />
//                                             </BarChart>
//                                         </ResponsiveContainer>
//                                     </CardContent>
//                                 </Card>
//                             </TabsContent>
//                             <TabsContent value="timeline">
//                                 <Card>
//                                     <CardHeader>
//                                         <CardTitle>Customer Timeline</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <div className="space-y-4">
//                                             {customer.orders && customer.orders.map((order) => (
//                                                 <div key={order.id} className="flex items-center space-x-4">
//                                                     <Badge variant="outline">{new Date(order.date).toLocaleDateString()}</Badge>
//                                                     <p>Placed order #{order.id} for ${order.total}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </TabsContent>
//                             <TabsContent value="notes">
//                                 <Card>
//                                     <CardHeader>
//                                         <CardTitle>Customer Notes</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <div className="space-y-4 mb-4">
//                                             {notes.map((note) => (
//                                                 <div key={note.id} className="bg-muted p-3 rounded-md">
//                                                     <p className="text-sm text-muted-foreground mb-1">{note.date}</p>
//                                                     <p>{note.content}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="flex space-x-2">
//                                             <Textarea
//                                                 placeholder="Add a note..."
//                                                 value={newNote}
//                                                 onChange={(e) => setNewNote(e.target.value)}
//                                             />
//                                             <Button onClick={addNote}>
//                                                 <Send className="h-4 w-4 mr-2" />
//                                                 Add Note
//                                             </Button>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </TabsContent>
//                         </Tabs>
//                     </div>
//                     <div className="space-y-6">
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Quick Actions</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="space-y-2">
//                                     <Button className="w-full justify-start">
//                                         <PenSquare className="h-4 w-4 mr-2" />
//                                         Edit customer
//                                     </Button>
//                                     <Button className="w-full justify-start" variant="outline">
//                                         <Copy className="h-4 w-4 mr-2" />
//                                         Duplicate customer
//                                     </Button>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Customer Segment</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <Badge variant="secondary">{customer.customer_segment}</Badge>
//                             </CardContent>
//                         </Card>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Tags</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="flex flex-wrap gap-2">
//                                     <Badge>VIP</Badge>
//                                     <Badge>Loyal</Badge>
//                                     <Badge variant="outline">
//                                         <Plus className="h-3 w-3 mr-1" />
//                                         Add tag
//                                     </Badge>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Product Recommendations</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <ul className="space-y-2">
//                                     {customer.product_recommendations && customer.product_recommendations.map((product) => (
//                                         <li key={product.id} className="flex justify-between items-center">
//                                             <span>{product.name}</span>
//                                             <span>${product.price}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </CardContent>
//                         </Card>
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle>Store Credit</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <p className="text-2xl font-bold">$0.00</p>
//                                 <Button className="w-full mt-2">Add store credit</Button>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }



'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Copy, MoreHorizontal, PenSquare, Plus, Send, TrendingUp, DollarSign, ShoppingCart, Users, Clock, Star } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import AdvancedLoader from '@/components/common/AdvancedLoader'
import AdvancedError from '@/components/common/AdvancedError'
import { useQuery } from '@apollo/client'
import { GET_CUSTOMER_DETAILS_PAGE } from '@/ApolloClient'
import { useParams } from 'next/navigation'
import CustomerTenure from '@/components/common/CustomerTenure'

// Sample data to use when no GraphQL data is available
const sampleCustomerData = {
    id: "customer-123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    address: {
        address: "123 Main St",
        landmark: "beside hospital",
        city: "Anytown",
        pincode: "12345",
        state: "USA"
    },
    orders: [
        { id: "order-1", date: "2023-01-15", total: 150.00, status: "Delivered" },
        { id: "order-2", date: "2023-03-22", total: 89.99, status: "Shipped" },
        { id: "order-3", date: "2023-06-10", total: 210.50, status: "Processing" }
    ],
    lifetimeValue: 451.49,
    average_order_value: 150.16,
    total_orders: 3,
    last_purchase_date: "2023-06-10",
    customer_segment: "Regular",
    product_recommendations: [
        { id: "prod-1", name: "Premium Headphones", price: 199.99 },
        { id: "prod-2", name: "Wireless Charger", price: 49.99 },
        { id: "prod-3", name: "Smart Watch", price: 299.99 }
    ]
}

const purchaseHistory = [
    { month: 'Jan', amount: 150 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 89.99 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 210.50 },
]

export default function Component() {
    const params = useParams()
    const [notes, setNotes] = useState([
        { id: 1, content: "Customer prefers email communication", date: "2023-08-30" },
        { id: 2, content: "Interested in new product line", date: "2023-08-29" },
    ])
    const [newNote, setNewNote] = useState("")
    const customerId = Array.isArray(params?.customerId) ? parseInt(params.customerId[0]) : parseInt(params?.customerId);

    const { loading, error, data: customersData } = useQuery(GET_CUSTOMER_DETAILS_PAGE, {
        variables: { id: customerId },
    });

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([...notes, { id: notes.length + 1, content: newNote, date: new Date().toISOString().split('T')[0] }])
            setNewNote("")
        }
    }

    if (loading) return <AdvancedLoader />
    if (error) return <AdvancedError message={error?.message ?? "random error occured!"} />

    const customer = customersData?.customer || sampleCustomerData

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col gap-4 p-4 sm:p-8 md:p-12">
                <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-0">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Customers</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Customer Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=50&width=50" alt={customer.firstName} />
                            <AvatarFallback>{customer.firstName}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold capitalize">{customer.firstName} {customer.lastName}</h1>
                            <p className="text-sm text-muted-foreground">{customer.address.city === "" && customer.address.state === "" ? (
                                "No address found"
                            ) : (
                                `${customer.address.city === "" ? "No city" : customer.address.city}, ${customer.address.state === "" ? "No state" : customer.address.state}`
                            )}
                                •<CustomerTenure createdAt={customer.createdAt} /></p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>Create order</Button>
                        <Button variant="outline" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="orders">Orders</TabsTrigger>
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Customer Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="font-semibold mb-2">Contact Information</h3>
                                                <p>Email: {customer.email}</p>
                                                <p>Phone: {customer.phoneNumber}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Address</h3>
                                                <p className='capitalize'>{customer.firstName} {customer.lastName}</p>
                                                <p>{customer.address?.address}, {customer.address?.landmark}</p>
                                                <p>{customer.address?.city} {customer.address?.pincode}</p>
                                                <p>{customer.address?.state}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Lifetime Value</CardTitle>
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">${customer.lifetimeValue ? customer.lifetimeValue.toFixed(2) : "null"}</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">${customer.average_order_value ? customer.average_order_value.toFixed(2) : "null"}</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{customer.total_orders}</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Last Purchase</CardTitle>
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{new Date(customer.last_purchase_date).toLocaleDateString()}</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">${customer.average_order_value ? customer.average_order_value.toFixed(2) : "null"}</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="orders">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {customer.orders && customer.orders.length > 0 ? (
                                            <table className="w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="text-left">Order ID</th>
                                                        <th className="text-left">Status</th>
                                                        <th className="text-left">Date</th>
                                                        <th className="text-left">Total</th>
                                                        <th className="text-left">Items</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customer.orders.map((order) => (
                                                        <tr key={order.id}>
                                                            <td>{order.id}</td>
                                                            <td>{order.status}</td>
                                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                            <td>${order.total.toFixed(2)}</td>
                                                            <td>{order.orderItems?.product?.name}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>This customer hasn&apos;t placed any orders yet.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="analytics">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Purchase History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={purchaseHistory}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="amount" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="timeline">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Customer Timeline</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {customer.orders && customer.orders.map((order) => (
                                                <div key={order.id} className="flex items-center space-x-4">
                                                    <Badge variant="outline">{new Date(order.date).toLocaleDateString()}</Badge>
                                                    <p>Placed order #{order.id} for ${order.total.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="notes">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Customer Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4 mb-4">
                                            {notes.map((note) => (
                                                <div key={note.id} className="bg-muted p-3 rounded-md">
                                                    <p className="text-sm text-muted-foreground mb-1">{note.date}</p>
                                                    <p>{note.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex space-x-2">
                                            <Textarea
                                                placeholder="Add a note..."
                                                value={newNote}
                                                onChange={(e) => setNewNote(e.target.value)}
                                            />
                                            <Button onClick={addNote}>
                                                <Send className="h-4 w-4 mr-2" />
                                                Add Note
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Button className="w-full justify-start">
                                        <PenSquare className="h-4 w-4 mr-2" />
                                        Edit customer
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Copy className="h-4 w-4 mr-2" />
                                        Duplicate customer
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Segment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="secondary">{customer.customer_segment}</Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge>VIP</Badge>
                                    <Badge>Loyal</Badge>
                                    {customer.tags && customer.tags.length > 0 && customer.tags.map((tag, index) => (
                                        <Badge key={index}>{tag.name}</Badge>
                                    ))}
                                    <Badge variant="outline">
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add tag
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {customer.product_recommendations && customer.product_recommendations.map((product) => (
                                        <li key={product.id} className="flex justify-between items-center">
                                            <span>{product.name}</span>
                                            <span>${product.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Store Credit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">$0.00</p>
                                <Button className="w-full mt-2">Add store credit</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}