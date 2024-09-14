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

export const GET_ORDER_QUERY = gql`
  query GetOrder($id: Int!) {
    order(id: $id) {
      id
      customer {
        firstName
        lastName
        email
        phoneNumber
        notes
        tags {
          name
        }
        lifetimeValue
        acquisitionCost
      }
      createdAt
      status
      orderItems {
        id
        product {
          name
          variants {
            sku
          }
        }
        quantity
        price
      }
      total
      shippingFees
      discount
      otherFees
      shippingAddress {
        address
        city
        state
        pincode
        phone
        company
      }
      tags {
        name
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

export const GET_ORDER_PAGE_QUERY = gql`
  query GetOrder($id: Int!) {
    order(id: $id) {
      id
      customer {
        firstName
        lastName
        email
        phoneNumber
      }
      createdAt
      status
      orderItems {
        id
        product {
          name
          imageUrl
          variants {
            sku
          }
          stockQuantity
          price
        }
      }
      total
      taxRate
      shippingFees
      discount
      total
      coupon {
        code
        discountValue
      }
      shippingAddress {
        address
        landmark
        city
        state
        pincode
      }
      tags {
        name
      }
    }
  }
`

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: Int!, $status: OrderStatus!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      status
      customer {
        firstName
        lastName
        email
        phoneNumber
      }
      orderItems {
        id
        product {
          stockQuantity
        }
      }
      tags {
        name
      }
    }
  }
`
