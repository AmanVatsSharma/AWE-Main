'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, DownloadIcon, FilterIcon, MoreHorizontalIcon, RefreshCcwIcon, SearchIcon, SlidersIcon, TrashIcon, CheckIcon, XIcon, AlertTriangleIcon, ShoppingCartIcon, DollarSignIcon, TrendingUpIcon, AlertCircleIcon } from 'lucide-react'
import { format } from 'date-fns'

// Mock data for orders (expanded)
const orders = [
  { id: "ORD001", customer: "John Doe", amount: 299.99, status: "Completed", date: "2023-06-15", items: 3, paymentMethod: "Credit Card", shippingAddress: "123 Main St, Anytown, USA", notes: "Gift wrap requested" },
  { id: "ORD002", customer: "Jane Smith", amount: 199.50, status: "Processing", date: "2023-06-14", items: 2, paymentMethod: "PayPal", shippingAddress: "456 Elm St, Somewhere, USA", notes: "Expedited shipping" },
  { id: "ORD003", customer: "Bob Johnson", amount: 599.99, status: "Shipped", date: "2023-06-13", items: 5, paymentMethod: "Credit Card", shippingAddress: "789 Oak St, Nowhere, USA", notes: "" },
  { id: "ORD004", customer: "Alice Brown", amount: 149.99, status: "Completed", date: "2023-06-12", items: 1, paymentMethod: "Debit Card", shippingAddress: "101 Pine St, Everywhere, USA", notes: "Customer requested follow-up" },
  { id: "ORD005", customer: "Charlie Davis", amount: 399.99, status: "Processing", date: "2023-06-11", items: 4, paymentMethod: "Credit Card", shippingAddress: "202 Maple St, Anywhere, USA", notes: "" },
  { id: "ORD006", customer: "Eva Wilson", amount: 89.99, status: "Completed", date: "2023-06-10", items: 1, paymentMethod: "PayPal", shippingAddress: "303 Birch St, Someplace, USA", notes: "Fragile items" },
  { id: "ORD007", customer: "Frank Miller", amount: 749.99, status: "Shipped", date: "2023-06-09", items: 6, paymentMethod: "Credit Card", shippingAddress: "404 Cedar St, Elsewhere, USA", notes: "" },
  { id: "ORD008", customer: "Grace Taylor", amount: 129.99, status: "Processing", date: "2023-06-08", items: 2, paymentMethod: "Debit Card", shippingAddress: "505 Walnut St, Nowhere, USA", notes: "Customer requested email notification" },
  { id: "ORD009", customer: "Henry Clark", amount: 199.99, status: "Completed", date: "2023-06-07", items: 3, paymentMethod: "Credit Card", shippingAddress: "606 Chestnut St, Anywhere, USA", notes: "" },
  { id: "ORD010", customer: "Ivy Martinez", amount: 299.99, status: "Shipped", date: "2023-06-06", items: 4, paymentMethod: "PayPal", shippingAddress: "707 Spruce St, Somewhere, USA", notes: "International shipping" },
]

const statusColors = {
  Completed: "bg-green-100 text-green-800 border-green-300",
  Processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Shipped: "bg-blue-100 text-blue-800 border-blue-300",
}

const paymentMethods = ["Credit Card", "PayPal", "Debit Card"]

export default function AdvancedAllOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(paymentMethods)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("list")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  
  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || order.status === statusFilter) &&
      selectedPaymentMethods.includes(order.paymentMethod) &&
      (!dateRange.from || new Date(order.date) >= dateRange.from) &&
      (!dateRange.to || new Date(order.date) <= dateRange.to)
    )
  }, [searchTerm, statusFilter, dateRange, selectedPaymentMethods])

  const sortedOrders = useMemo(() => {
    let sortableOrders = [...filteredOrders]
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableOrders
  }, [filteredOrders, sortConfig])

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
    }
    return null
  }

  const orderStatusData = useMemo(() => {
    const statusCounts = filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    }, {})
    return Object.entries(statusCounts).map(([status, count]) => ({ status, count }))
  }, [filteredOrders])

  const orderValueData = useMemo(() => {
    return filteredOrders.map(order => ({
      id: order.id,
      amount: order.amount
    }))
  }, [filteredOrders])

  const dailyRevenueData = useMemo(() => {
    const revenueByDate = filteredOrders.reduce((acc, order) => {
      const date = order.date
      acc[date] = (acc[date] || 0) + order.amount
      return acc
    }, {})
    return Object.entries(revenueByDate).map(([date, revenue]) => ({ date, revenue }))
  }, [filteredOrders])

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    )
  }

  const handleSelectAllOrders = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedOrders(sortedOrders.map(order => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleDeleteSelected = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real application, you would delete the selected orders here
    console.log("Deleting orders:", selectedOrders)
    setSelectedOrders([])
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">All Orders</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline">
                <RefreshCcwIcon className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${filteredOrders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(filteredOrders.reduce((sum, order) => sum + order.amount, 0) / filteredOrders.length).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredOrders.filter(order => order.status === "Processing").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  -3% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>A list of all orders with details.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedOrders.length === sortedOrders.length}
                    onCheckedChange={handleSelectAllOrders}
                  />
                  <Label htmlFor="select-all">Select All</Label>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={selectedOrders.length === 0}
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Select</TableHead>
                    <TableHead className="w-[100px] cursor-pointer" onClick={() => requestSort('id')}>
                      Order ID {getSortIcon('id')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('customer')}>
                      Customer {getSortIcon('customer')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('amount')}>
                      Amount {getSortIcon('amount')}
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('date')}>
                      Date {getSortIcon('date')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => requestSort('items')}>
                      Items {getSortIcon('items')}
                    </TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {sortedOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => handleSelectOrder(order.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>${order.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Showing {sortedOrders.length} of {orders.length} orders</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={Object.values(statusColors)[index % Object.values(statusColors).length].split(' ')[0]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Order Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={orderValueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="id" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete the selected orders?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the selected orders.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}