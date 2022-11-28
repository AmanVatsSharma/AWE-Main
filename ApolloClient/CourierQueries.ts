import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($userId: ID!) {
    dashboard(userId: $userId) {
      metrics {
        id
        label
        value
      }
      recentActivity {
        id
        type
        description
        timestamp
      }
      shipmentData {
        date
        shipments
        revenue
      }
    }
  }
`;

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($preferences: UserPreferencesInput!) {
    updateUserPreferences(preferences: $preferences) {
      success
      message
    }
  }
`;

export const GET_SHIPMENTS = gql`
  query GetShipments {
    shipments {
      id
      trackingNumber
      status
      senderName
      recipientName
      createdAt
    }
  }
`

export const GET_SHIPMENT_DETAILS = gql`
  query GetShipmentDetails($id: ID!) {
    shipment(id: $id) {
      id
      trackingNumber
      status
      senderName
      senderAddress
      recipientName
      recipientAddress
      weight
      dimensions {
        length
        width
        height
      }
      createdAt
      trackingHistory {
        status
        timestamp
        location
      }
    }
  }
`

export const CREATE_SHIPMENT = gql`
  mutation CreateShipment($input: CreateShipmentInput!) {
    createShipment(input: $input) {
      id
      trackingNumber
    }
  }
`

export const BULK_CREATE_SHIPMENTS = gql`
  mutation BulkCreateShipments($input: [CreateShipmentInput!]!) {
    bulkCreateShipments(input: $input) {
      successCount
      failureCount
      errors {
        index
        message
      }
    }
  }
`

export const GET_COURIERS = gql`
  query GetCouriers {
    couriers {
      id
      name
    }
  }
`

export const GET_SHIPMENT_TRACKING = gql`
  query GetShipmentTracking($trackingNumber: String!) {
    shipmentTracking(trackingNumber: $trackingNumber) {
      id
      trackingNumber
      status
      estimatedDelivery
      weight
      dimensions {
        length
        width
        height
      }
      trackingHistory {
        status
        location
        latitude
        longitude
        timestamp
      }
      deliveryPreferences {
        signature
        safeDropOff
        holdAtLocation
      }
    }
  }
`

export const SHIPMENT_UPDATED_SUBSCRIPTION = gql`
  subscription ShipmentUpdated($trackingNumber: String!) {
    shipmentUpdated(trackingNumber: $trackingNumber) {
      id
      trackingNumber
      status
      estimatedDelivery
    }
  }
`

export const GENERATE_TRACKING_PAGE = gql`
  mutation GenerateTrackingPage($trackingNumber: String!, $customizations: TrackingPageCustomizationsInput!) {
    generateTrackingPage(trackingNumber: $trackingNumber, customizations: $customizations) {
      url
    }
  }
`

export const UPDATE_DELIVERY_PREFERENCES = gql`
  mutation UpdateDeliveryPreferences($trackingNumber: String!, $preferences: DeliveryPreferencesInput!) {
    updateDeliveryPreferences(trackingNumber: $trackingNumber, preferences: $preferences) {
      id
      trackingNumber
      deliveryPreferences {
        signature
        safeDropOff
        holdAtLocation
      }
    }
  }
`


export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      orderNumber
      customer
      total
      status
      createdAt
    }
  }
`

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($id: ID!) {
    orderDetails(id: $id) {
      id
      orderNumber
      customer {
        name
        email
        phone
      }
      shippingAddress {
        street
        city
        state
        zipCode
        country
      }
      items {
        id
        name
        quantity
        price
      }
      total
      tax
      shippingCost
      status
      createdAt
      shipments {
        id
        trackingNumber
        courier
        status
      }
    }
  }
`

export const IMPORT_ORDERS = gql`
  mutation ImportOrders($platform: String!, $file: Upload!) {
    importOrders(platform: $platform, file: $file) {
      count
    }
  }
`

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      orderNumber
      status
    }
  }
`
export const GET_SHIPMENT_REPORTS = gql`
  query GetShipmentReports($start: String!, $end: String!) {
    shipmentReports(start: $start, end: $end) {
      totalShipments
      totalCost
      averageCostPerShipment
      shipmentsByMonth {
        month
        shipments
      }
      shipmentsByType {
        type
        count
      }
    }
  }
`

export const GET_FINANCIAL_REPORTS = gql`
  query GetFinancialReports($start: String!, $end: String!) {
    financialReports(start: $start, end: $end) {
      totalRevenue
      totalExpenses
      netProfit
      revenueByMonth {
        month
        revenue
      }
      expenseCategories {
        category
        amount
      }
    }
  }
`

export const GET_PERFORMANCE_ANALYTICS = gql`
  query GetPerformanceAnalytics($start: String!, $end: String!) {
    performanceAnalytics(start: $start, end: $end) {
      onTimeDeliveryRate
      averageDeliveryTime
      customerSatisfactionScore
      deliverySuccessRate
      performanceByMonth {
        month
        onTimeRate
        avgDeliveryTime
        satisfaction
      }
    }
  }
`
export const GET_SUBSCRIPTION_DATA = gql`
  query GetSubscriptionData {
    subscriptionData {
      currentPlan
      plans {
        id
        name
        price
        features
      }
    }
  }
`

export const GET_BILLING_HISTORY = gql`
  query GetBillingHistory {
    billingHistory {
      id
      date
      amount
      status
      description
    }
  }
`

export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods {
    paymentMethods {
      id
      type
      last4
      expMonth
      expYear
      brand
      email
    }
  }
`

export const GET_WALLET_DATA = gql`
  query GetWalletData {
    walletData {
      balance
      transactions {
        id
        date
        amount
        type
        description
      }
    }
  }
`
export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription($planId: String!) {
    updateSubscription(planId: $planId) {
      success
      message
    }
  }
`

export const ADD_PAYMENT_METHOD = gql`
  mutation AddPaymentMethod($paymentMethod: PaymentMethodInput!) {
    addPaymentMethod(paymentMethod: $paymentMethod) {
      success
      message
    }
  }
`

export const REMOVE_PAYMENT_METHOD = gql`
  mutation RemovePaymentMethod($paymentMethodId: String!) {
    removePaymentMethod(paymentMethodId: $paymentMethodId) {
      success
      message
    }
  }
`

export const ADD_FUNDS_TO_WALLET = gql`
  mutation AddFundsToWallet($amount: Float!) {
    addFundsToWallet(amount: $amount) {
      success
      message
      newBalance
    }
  }
`
