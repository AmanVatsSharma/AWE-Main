'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, BellIcon, CalendarIcon, ChevronDownIcon, CreditCardIcon, DollarSignIcon, DownloadIcon, FilterIcon, LineChartIcon, PackageIcon, PieChartIcon, SearchIcon, SettingsIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon, UsersIcon, TrendingUpIcon, TrendingDownIcon, StarIcon } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useQuery } from '@apollo/client'
import { GET_DASHBOARD_SUMMARY } from '@/ApolloClient/AnalyticsQueries'
import AdvancedLoader from '@/components/common/AdvancedLoader'

// Mock data (expanded for more detail)
const sampleDashboardData = {
  totalRevenue: 1234567,
  totalOrders: 5678,
  totalCustomers: 9876,
  averageOrderValue: 217.43,
  topSellingProducts: [
    { product: { name: "Premium Headphones" }, viewCount: 1500, addToCartCount: 800, purchaseCount: 500, conversionRate: 33.33, averageRating: 4.8, revenue: 74500 },
    { product: { name: "Wireless Keyboard" }, viewCount: 1200, addToCartCount: 600, purchaseCount: 400, conversionRate: 33.33, averageRating: 4.5, revenue: 39600 },
    { product: { name: "4K Monitor" }, viewCount: 1000, addToCartCount: 450, purchaseCount: 300, conversionRate: 30, averageRating: 4.7, revenue: 119700 },
    { product: { name: "Ergonomic Mouse" }, viewCount: 900, addToCartCount: 400, purchaseCount: 250, conversionRate: 27.78, averageRating: 4.6, revenue: 17250 },
    { product: { name: "Mechanical Keyboard" }, viewCount: 800, addToCartCount: 350, purchaseCount: 200, conversionRate: 25, averageRating: 4.9, revenue: 25800 },
  ],
  recentOrders: [
    { id: "ORD001", customer: "John Doe", amount: 299.99, status: "Completed", date: "2023-06-15" },
    { id: "ORD002", customer: "Jane Smith", amount: 199.50, status: "Processing", date: "2023-06-14" },
    { id: "ORD003", customer: "Bob Johnson", amount: 599.99, status: "Shipped", date: "2023-06-13" },
    { id: "ORD004", customer: "Alice Brown", amount: 149.99, status: "Completed", date: "2023-06-12" },
    { id: "ORD005", customer: "Charlie Davis", amount: 399.99, status: "Processing", date: "2023-06-11" },
  ],
  salesTrend: [
    { date: "2023-01", revenue: 50000, orderCount: 100, averageOrderValue: 500 },
    { date: "2023-02", revenue: 55000, orderCount: 110, averageOrderValue: 500 },
    { date: "2023-03", revenue: 60000, orderCount: 120, averageOrderValue: 500 },
    { date: "2023-04", revenue: 58000, orderCount: 115, averageOrderValue: 504 },
    { date: "2023-05", revenue: 62000, orderCount: 125, averageOrderValue: 496 },
    { date: "2023-06", revenue: 65000, orderCount: 130, averageOrderValue: 500 },
  ],
  customerGrowth: [
    { date: "2023-01", newCustomers: 50, totalCustomers: 1000, churnRate: 2 },
    { date: "2023-02", newCustomers: 60, totalCustomers: 1060, churnRate: 1.8 },
    { date: "2023-03", newCustomers: 55, totalCustomers: 1115, churnRate: 1.9 },
    { date: "2023-04", newCustomers: 70, totalCustomers: 1185, churnRate: 1.7 },
    { date: "2023-05", newCustomers: 65, totalCustomers: 1250, churnRate: 1.6 },
    { date: "2023-06", newCustomers: 80, totalCustomers: 1330, churnRate: 1.5 },
  ],
  categoryPerformance: [
    { category: "Electronics", sales: 450, profit: 15000, satisfaction: 4.5 },
    { category: "Clothing", sales: 300, profit: 9000, satisfaction: 4.2 },
    { category: "Books", sales: 200, profit: 5000, satisfaction: 4.7 },
    { category: "Home & Garden", sales: 150, profit: 4500, satisfaction: 4.3 },
    { category: "Sports", sales: 100, profit: 3000, satisfaction: 4.6 },
  ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)
useEffect(() => {
    let start = 0
    const end = parseInt(value.toString().replace(/,/g, ''))
    const duration = 1000
    let startTimestamp = null

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setDisplayValue(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)

  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}


const Blob = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  )
}

export default function Dashboard() {
  const { loading, error, data } = useQuery(GET_DASHBOARD_SUMMARY);
  const [dashboardData, setDashboardData] = useState(sampleDashboardData)
  
  const [activeTab, setActiveTab] = useState("overview")
  const [isAnimating, setIsAnimating] = useState(false)
  const blobRef = useRef()

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [activeTab])

  useEffect( () => {
    if (data){
      setDashboardData(data.dashboardSummary)
      console.log(data.dashboardSummary)
    }
  }, [data])

  if (loading)
    return <AdvancedLoader/>
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Ultra Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input className="w-64 pl-10" placeholder="Search..." />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="outline" size="icon">
            <BellIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white p-1 rounded-full shadow-lg">
          <TabsTrigger value="overview" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
            <DollarSignIcon className="h-4 w-4 mr-2" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="products" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
            <PackageIcon className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="customers" className="rounded-full px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
            <UsersIcon className="h-4 w-4 mr-2" />
            Customers
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                    <DollarSignIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      $<AnimatedNumber value={dashboardData.totalRevenue} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-green-500 font-medium">↑ 20.1%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
                    <ShoppingCartIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedNumber value={dashboardData.totalOrders} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-green-500 font-medium">↑ 15%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
                    <UsersIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedNumber value={dashboardData.totalCustomers} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-green-500 font-medium">↑ 10.5%</span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Average Order Value</CardTitle>
                    <CreditCardIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      $<AnimatedNumber value={dashboardData.averageOrderValue} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-green-500 font-medium">↑ 5.2%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Sales Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dashboardData.salesTrend}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="date" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                            labelStyle={{ color: '#374151' }}
                            itemStyle={{ color: '#3B82F6' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-500">Product</TableHead>
                          <TableHead className="text-right text-gray-500">Revenue</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.topSellingProducts ? dashboardData.topSellingProducts.slice(0, 5).map((product, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-gray-900">{product.product.name}</TableCell>
                            <TableCell className="text-right text-gray-900">${product.revenue.toLocaleString()}</TableCell>
                          </TableRow>
                        )) : "Top Selling Products Section work in progress"}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Customer Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dashboardData.customerGrowth}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="date" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                            labelStyle={{ color: '#374151' }}
                            itemStyle={{ color: '#3B82F6' }}
                          />
                          <Line type="monotone" dataKey="newCustomers" stroke="#3B82F6" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="totalCustomers" stroke="#10B981" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3 bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-500">Order ID</TableHead>
                          <TableHead className="text-gray-500">Status</TableHead>
                          <TableHead className="text-right text-gray-500">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.recentOrders.map((order, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-gray-900">{order.id}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  order.status === 'Completed'
                                    ? 'bg-green-100 text-green-800 border-green-300'
                                    : order.status === 'Processing'
                                      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                      : 'bg-blue-100 text-blue-800 border-blue-300'
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right text-gray-900">${order.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Sales Analytics</CardTitle>
                  <CardDescription className="text-gray-500">Detailed breakdown of sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dashboardData.salesTrend}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis yAxisId="left" stroke="#6B7280" />
                        <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                          labelStyle={{ color: '#374151' }}
                          itemStyle={{ color: '#3B82F6' }}
                        />
                        <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area yAxisId="right" type="monotone" dataKey="orderCount" stroke="#10B981" fillOpacity={1} fill="url(#colorOrders)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Time Range</p>
                        <Select defaultValue="6months">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1month">Last Month</SelectItem>
                            <SelectItem value="3months">Last 3 Months</SelectItem>
                            <SelectItem value="6months">Last 6 Months</SelectItem>
                            <SelectItem value="1year">Last Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                        Download Report
                        <DownloadIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-blue-50 border-blue-100">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-blue-700">$350,000</div>
                          <p className="text-sm text-blue-600">Total Revenue</p>
                          <div className="mt-2 flex items-center text-sm text-blue-600">
                            <TrendingUpIcon className="h-4 w-4 mr-1" />
                            <span>8.2% increase</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-green-50 border-green-100">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-green-700">700</div>
                          <p className="text-sm text-green-600">Total Orders</p>
                          <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUpIcon className="h-4 w-4 mr-1" />
                            <span>5.3% increase</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-purple-50 border-purple-100">
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold text-purple-700">$500</div>
                          <p className="text-sm text-purple-600">Average Order Value</p>
                          <div className="mt-2 flex items-center text-sm text-purple-600">
                            <TrendingUpIcon className="h-4 w-4 mr-1" />
                            <span>2.8% increase</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Product Performance</CardTitle>
                  <CardDescription className="text-gray-500">Analysis of top-selling products</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                      {dashboardData.topSellingProducts ? dashboardData.topSellingProducts.map((product, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <PackageIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="text-sm font-medium text-gray-900">{product.product.name}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <ShoppingBagIcon className="h-4 w-4 mr-1" />
                              {product.purchaseCount} sold
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{product.conversionRate}% conv. rate</p>
                          </div>
                        </div>
                      )) : "top selling products section work in progress"}
                    </div>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        {dashboardData.topSellingProducts ? 
                        
                        <PieChart>
                          <Pie
                            data={dashboardData.topSellingProducts}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="revenue"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {dashboardData.topSellingProducts.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                            labelStyle={{ color: '#374151' }}
                            itemStyle={{ color: '#3B82F6' }}
                          />
                        </PieChart>
                      : "top selling products work in progress: unable to load chart"}
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={dashboardData.categoryPerformance}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="category" />
                          <PolarRadiusAxis angle={30} domain={[0, 150]} />
                          <Radar name="Sales" dataKey="sales" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Radar name="Profit" dataKey="profit" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                          <Radar name="Satisfaction" dataKey="satisfaction" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                          <Legend />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Customer Insights</CardTitle>
                  <CardDescription className="text-gray-500">Detailed analysis of customer growth and behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Growth</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardData.customerGrowth}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                              <XAxis dataKey="date" stroke="#6B7280" />
                              <YAxis stroke="#6B7280" />
                              <Tooltip
                                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                                labelStyle={{ color: '#374151' }}
                                itemStyle={{ color: '#3B82F6' }}
                              />
                              <Bar dataKey="newCustomers" fill="#3B82F6" name="New Customers" />
                              <Bar dataKey="totalCustomers" fill="#10B981" name="Total Customers" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="bg-blue-50 border-blue-100">
                            <CardContent className="pt-6">
                              <div className="text-2xl font-bold text-blue-700">1,330</div>
                              <p className="text-sm text-blue-600">Total Customers</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-green-50 border-green-100">
                            <CardContent className="pt-6">
                              <div className="text-2xl font-bold text-green-700">80</div>
                              <p className="text-sm text-green-600">New Customers (This Month)</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-yellow-50 border-yellow-100">
                            <CardContent className="pt-6">
                              <div className="text-2xl font-bold text-yellow-700">1.5%</div>
                              <p className="text-sm text-yellow-600">Churn Rate</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-purple-50 border-purple-100">
                            <CardContent className="pt-6">
                              <div className="text-2xl font-bold text-purple-700">$217.43</div>
                              <p className="text-sm text-purple-600">Average Order Value</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Satisfaction</h3>
                        <div className="h-[300px] flex items-center justify-center">
                          <div className="relative w-64 h-64">
                            <Blob />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-5xl font-bold text-white">4.8</div>
                                <div className="text-sm text-white">Average Rating</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Customer Activity</h3>
                        <div className="space-y-4">
                          {dashboardData.recentOrders.map((order, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                <p className="text-xs text-gray-500">Placed an order for ${order.amount}</p>
                              </div>
                              <div className="text-xs text-gray-500">{order.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}