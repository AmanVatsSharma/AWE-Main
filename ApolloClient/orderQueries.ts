// GraphQL Queries and Mutations
import { gql } from '@apollo/client';

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      name
      email
      phone
      address
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $customerId: Int!
    $shippingAddress: AddressInput!
    $billingAddress: AddressInput!
    $orderItems: [OrderItemInput!]!
    $discount: Float
    $shippingFees: Float
    $otherFees: Float
    $taxRate: Float
    $notes: String
  ) {
    createOrder(
      input: {
        customerId: $customerId
        shippingAddress: $shippingAddress
        billingAddress: $billingAddress
        orderItems: $orderItems
        discount: $discount
        shippingFees: $shippingFees
        otherFees: $otherFees
        taxRate: $taxRate
        notes: $notes
      }
    ) {
      id
      total
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($page: Int!, $perPage: Int!) {
    orders(page: $page, perPage: $perPage) {
      edges {
        node {
        id
          status
          createdAt
          customer {
            firstName
            lastName
            email
          }
          total
        }
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query OrderDetails($id: Int!) {
    order(id: $id) {
      id
      status
      createdAt
      total
      discount
      shippingFees
      taxRate
      notes
      customer {
        firstName
        lastName
        email
        phoneNumber
      }
      orderItems {
        product {
          name
        }
        quantity
        price
      }
      shippingAddress{
        address
        landmark
        city
        state
        pincode
        phone
  }

    }
  }
`;




export const GET_STORE_SETTINGS = gql`
  query GetStoreSettings {
    storeSettings {
      taxIncludedInPrice
    }
  }
`;
