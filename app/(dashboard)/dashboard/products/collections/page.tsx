"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts"
import { ArrowRight, Plus, RefreshCw, Search, Bell, Settings, HelpCircle, User, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react"
import AdvancedLoader from "@/components/common/AdvancedLoader"

// Mock data 
const collectionStats = [
    { name: "Total Collections", value: 150, change: 5, trend: "up" },
    { name: "Active Collections", value: 120, change: 3, trend: "up" },
    { name: "Inactive Collections", value: 30, change: -2, trend: "down" },
    { name: "Total Items", value: 10000, change: 150, trend: "up" },
]

const recentActivities = [
    { id: 1, action: "Collection Created", collection: "New Electronics", user: "John Doe", time: "2 hours ago" },
    { id: 2, action: "Collection Updated", collection: "Clothing", user: "Jane Smith", time: "4 hours ago" },
    { id: 3, action: "Collection Deleted", collection: "Old Books", user: "Mike Johnson", time: "1 day ago" },
    { id: 4, action: "Items Added", collection: "Home Decor", user: "Emily Brown", time: "2 days ago" },
    { id: 5, action: "Collection Activated", collection: "Seasonal Items", user: "Chris Wilson", time: "3 days ago" },
]

const topCollections = [
    { name: "Electronics", items: 2500 },
    { name: "Clothing", items: 2000 },
    { name: "Books", items: 1500 },
    { name: "Home & Garden", items: 1200 },
    { name: "Toys", items: 800 },
]

const collectionDistribution = [
    { name: "Electronics", value: 30 },
    { name: "Clothing", value: 25 },
    { name: "Books", value: 20 },
    { name: "Home & Garden", value: 15 },
    { name: "Toys", value: 10 },
]

const monthlyTrend = [
    { name: "Jan", collections: 100, items: 8000 },
    { name: "Feb", collections: 110, items: 8500 },
    { name: "Mar", collections: 120, items: 9000 },
    { name: "Apr", collections: 130, items: 9500 },
    { name: "May", collections: 140, items: 9800 },
    { name: "Jun", collections: 150, items: 10000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [date, setDate] = useState<Date | undefined>(new Date())

    useEffect(() => {
        // Simulating data fetching
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Collection Management Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon">
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <HelpCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <User className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <AdvancedLoader />
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                        {collectionStats.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.name}
                                    </CardTitle>
                                    <Badge variant={stat.trend === "up" ? "default" : "destructive"}>
                                        {stat.trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                        {stat.change}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                                    <Progress value={stat.value / 200 * 100} className="mt-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Monthly Trend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={monthlyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Line yAxisId="left" type="monotone" dataKey="collections" stroke="#8884d8" />
                                        <Line yAxisId="right" type="monotone" dataKey="items" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Collection Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={collectionDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {collectionDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Collections by Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={topCollections}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="items" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px]">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="mb-4 last:mb-0">
                                            <div className="font-semibold">{activity.action}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {activity.collection} - {activity.user}
                                            </div>
                                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Search</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Input type="text" placeholder="Search collections..." />
                                    <Button type="submit">
                                        <Search className="h-4 w-4 mr-2" />
                                        Search
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Date Picker</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col space-y-2">
                                <Button asChild>
                                    <Link href="/collections/new">
                                        <Plus className="mr-2 h-4 w-4" /> Create Collection
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/collections">
                                        View All Collections
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/collections/bulk">
                                        Bulk Operations
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="daily" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="daily">Daily</TabsTrigger>
                                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                                </TabsList>
                                <TabsContent value="daily">
                                    <div className="text-center py-10">
                                        <h3 className="text-2xl font-bold">Daily Performance</h3>
                                        <p className="text-muted-foreground">Collections created: 5</p>
                                        <p className="text-muted-foreground">Items added: 150</p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="weekly">
                                    <div className="text-center py-10">
                                        <h3 className="text-2xl font-bold">Weekly Performance</h3>
                                        <p className="text-muted-foreground">Collections created: 25</p>
                                        <p className="text-muted-foreground">Items added: 1,000</p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="monthly">
                                    <div className="text-center py-10">
                                        <h3 className="text-2xl font-bold">Monthly Performance</h3>
                                        <p className="text-muted-foreground">Collections created: 100</p>
                                        <p className="text-muted-foreground">Items added: 5,000</p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="yearly">
                                    <div className="text-center py-10">
                                        <h3 className="text-2xl font-bold">Yearly Performance</h3>
                                        <p className="text-muted-foreground">Collections created: 1,200</p>
                                        <p className="text-muted-foreground">Items added: 60,000</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}