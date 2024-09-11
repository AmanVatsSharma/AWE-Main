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
