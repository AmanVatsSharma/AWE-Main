"use client"
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DashboardData, UserPreferences } from '@/components/couriers/types';
import MetricsOverview from '@/components/couriers/MetricsOverview';
import RecentActivity from '@/components/couriers/RecentActivity';
import ShipmentChart from '@/components/couriers/ShipmentChart';
import PerformanceIndicators from '@/components/couriers/PerformanceIndicators';
import NotificationCenter from '@/components/couriers/NotificationCenter';
import WeatherWidget from '@/components/couriers/WeatherWidget';
import NewsFeed from '@/components/couriers/NewsFeed';
import { GET_DASHBOARD_DATA, UPDATE_USER_PREFERENCES } from '@/ApolloClient/CourierQueries';
import DashboardCustomization from '@/components/couriers/DashboardCustomization';
import QuickActions from '@/components/couriers/QuickActions';
import AdvancedLoader from '@/components/common/AdvancedLoader';
import AdvancedError from '@/components/common/AdvancedError';

const sampleDashboardData: { dashboard: DashboardData } = {
    dashboard: {
        metrics: [
            { id: 'total_shipments', label: 'Total Shipments', value: 1234 },
            { id: 'revenue', label: 'Revenue', value: '$45,678' },
            { id: 'active_orders', label: 'Active Orders', value: 89 },
            { id: 'customer_satisfaction', label: 'Customer Satisfaction', value: '4.8/5' },
            { id: 'on_time_delivery', label: 'On-Time Delivery', value: '98%' },
            { id: 'average_delivery_time', label: 'Avg. Delivery Time', value: '2.3 days' },
        ],
        recentActivity: [
            { id: '1', type: 'shipment', description: 'New shipment #12345 created', timestamp: '2 minutes ago' },
            { id: '2', type: 'order', description: 'Order #67890 marked as delivered', timestamp: '15 minutes ago' },
            { id: '3', type: 'shipment', description: 'Shipment #54321 out for delivery', timestamp: '1 hour ago' },
            { id: '4', type: 'other', description: 'New courier partner onboarded', timestamp: '3 hours ago' },
            { id: '5', type: 'order', description: 'Customer feedback received for order #98765', timestamp: '5 hours ago' },
        ],
        shipmentData: [
            { date: '2023-05-01', shipments: 100, revenue: 5000 },
            { date: '2023-05-02', shipments: 120, revenue: 6000 },
            { date: '2023-05-03', shipments: 110, revenue: 5500 },
            { date: '2023-05-04', shipments: 130, revenue: 6500 },
            { date: '2023-05-05', shipments: 140, revenue: 7000 },
            { date: '2023-05-06', shipments: 125, revenue: 6250 },
            { date: '2023-05-07', shipments: 135, revenue: 6750 },
        ],
        performanceIndicators: [
            { id: 'delivery_success_rate', label: 'Delivery Success Rate', value: 98.5, trend: 'up' },
            { id: 'average_shipping_cost', label: 'Avg. Shipping Cost', value: 12.75, trend: 'down' },
            { id: 'customer_retention', label: 'Customer Retention', value: 85, trend: 'up' },
        ],
    },
};

export default function Dashboard() {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        theme: 'light',
        layout: 'default',
        favoriteMetrics: ['total_shipments', 'revenue', 'active_orders'],
        widgetOrder: ['metrics', 'activity', 'actions', 'chart', 'performance', 'notifications', 'weather', 'news'],
    });

    // const { loading, error, data } = useQuery<{ dashboard: DashboardData }>(GET_DASHBOARD_DATA, {
    //     variables: { userId: 'current_user_id' },
    //     pollInterval: 300000, // Refresh every 5 minutes
    // });

    const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES);

    const handlePreferencesUpdate = async (newPreferences: Partial<UserPreferences>) => {
        const updatedPreferences = { ...userPreferences, ...newPreferences };
        setUserPreferences(updatedPreferences);
        await updatePreferences({ variables: { preferences: updatedPreferences } });
    };

    const [dashboardData, setDashboardData] = useState(sampleDashboardData.dashboard);

    // useEffect(() => {
    //     if (data) {
    //         setDashboardData(data.dashboard);
    //     }
    // }, [data]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newWidgetOrder = Array.from(userPreferences.widgetOrder);
        const [reorderedItem] = newWidgetOrder.splice(result.source.index, 1);
        newWidgetOrder.splice(result.destination.index, 0, reorderedItem);

        handlePreferencesUpdate({ widgetOrder: newWidgetOrder });
    };

    // if (loading) return <AdvancedLoader/>
    // if (error) return <AdvancedError message={error.message} />

    const { metrics, recentActivity, shipmentData, performanceIndicators } = dashboardData;

    const widgetComponents = {
        metrics: <MetricsOverview metrics={metrics} favoriteMetrics={userPreferences.favoriteMetrics} />,
        activity: <RecentActivity activities={recentActivity} />,
        actions: <QuickActions />,
        chart: <ShipmentChart data={shipmentData} />,
        performance: <PerformanceIndicators indicators={performanceIndicators} />,
        notifications: <NotificationCenter />,
        weather: <WeatherWidget />,
        news: <NewsFeed />,
    };

    if (!userPreferences.widgetOrder || userPreferences.widgetOrder.length === 0) {
        return <AdvancedLoader />;
    }

    return (
        <div className={`min-h-screen bg-${userPreferences.theme === 'light' ? 'gray-100' : 'gray-900'} transition-colors duration-200`}>
            <div className="container mx-auto px-4 py-8">
                <h1 className={`text-4xl font-bold mb-8 ${userPreferences.theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Dashboard</h1>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="dashboard">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {userPreferences.widgetOrder.map((widgetId, index) => (
                                    <Draggable key={widgetId} draggableId={widgetId} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="relative group"
                                            >
                                                <div className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Drag to reorder
                                                </div>
                                                {widgetComponents[widgetId]}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <DashboardCustomization
                    preferences={userPreferences}
                    onUpdatePreferences={handlePreferencesUpdate}
                />
            </div>
        </div>
    );
}