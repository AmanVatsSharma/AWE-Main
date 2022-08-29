import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Progress } from '@/components/ui/progress'
import { Clock, ThumbsUp, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

interface PerformanceAnalyticsProps {
    data: any
    loading: boolean
    error?: any
}

export default function PerformanceAnalytics({ data, loading, error }: PerformanceAnalyticsProps) {
    if (loading) return <div className="text-center">Loading performance analytics...</div>
    if (error) return <div className="text-center text-red-500">Error loading performance analytics. Please try again.</div>

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">On-Time Delivery Rate</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(data.onTimeDeliveryRate * 100).toFixed(1)}%</div>
                        <Progress value={data.onTimeDeliveryRate * 100} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.averageDeliveryTime.toFixed(1)} days</div>
                        <p className="text-xs text-muted-foreground">
                            -0.2 days from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.customerSatisfactionScore.toFixed(1)}/5</div>
                        <Progress value={(data.customerSatisfactionScore / 5) * 100} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Delivery Success Rate</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(data.deliverySuccessRate * 100).toFixed(1)}%</div>
                        <Progress value={data.deliverySuccessRate * 100} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.performanceByMonth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="onTimeRate" name="On-Time Rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line yAxisId="right" type="monotone" dataKey="avgDeliveryTime" name="Avg. Delivery Time" stroke="#82ca9d" />
                                <Line yAxisId="left" type="monotone" dataKey="satisfaction" name="Customer Satisfaction" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                            On-time delivery rate has improved by 2% this month.
                        </li>
                        <li className="flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                            Customer satisfaction score has increased to 4.7/5.
                        </li>
                        <li className="flex items-center">
                            <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                            Average delivery time slightly increased to 2.3 days.
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    )
}