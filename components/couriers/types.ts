export interface Metric {
    id: string;
    label: string;
    value: number | string;
    change?: number;
}

export interface Activity {
    id: string;
    type: 'shipment' | 'order' | 'other';
    description: string;
    timestamp: string;
}

export interface ShipmentData {
    date: string;
    shipments: number;
    revenue: number;
}

export interface PerformanceIndicator {
    id: string;
    label: string;
    value: number;
    trend: 'up' | 'down';
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    layout: string;
    favoriteMetrics: string[];
    widgetOrder: string[];
}

export interface DashboardData {
    metrics: Metric[];
    recentActivity: Activity[];
    shipmentData: ShipmentData[];
    performanceIndicators: PerformanceIndicator[];
}

export interface PackageDetails {
    weight: number
    length: number
    width: number
    height: number
    fromZip: string
    toZip: string
}

export interface LiveRate {
    courier: string
    rate: number
    estimatedDelivery: string
}

export interface CalculatedRate {
    rate: number
    estimatedDelivery: string
}

export interface SavedAddress {
    name: string
    zipCode: string
}
