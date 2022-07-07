import { gql } from "@apollo/client";

export const GetCustomers = gql`
  query Customers($page: Int!, $perPage: Int!) {
    customers(page: $page, perPage: $perPage) {
      edges {
        node {
          id
          firstName
          lastName
          email
          phoneNumber
        }
        cursor
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const SEARCH_CUSTOMERS = gql`
  query SearchCustomers($searchTerm: String!) {
    searchCustomers(searchTerm: $searchTerm, perPage: 5) {
      edges {
        node {
          id
          firstName
          lastName
          email
          phoneNumber
          address {
            city
            state
            pincode
          }
          notes
        tags{
          name
        }
        lifetimeValue
        createdAt
        }
      }
    }
  }
`;


export const GET_CUSTOMER = gql`
  query GetCustomer($id: Int!) {
    customer(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;


export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $phoneNumber: String!,
    $notes: String,
    $tags: [TagInput!],
    $address: AddressInput
  ) {
    createCustomer(
      input:{
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        phoneNumber: $phoneNumber,
        notes: $notes,
        tags: $tags,
        address: $address
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;


export const GET_CUSTOMER_DETAILS_PAGE = gql`
  query GetCustomer($id: Int!) {
    customer(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      address {
        address
        landmark
        city
        state
        pincode
        phone
        company
      }
      tags{
      name
      }
      createdAt
      lifetimeValue
      acquisitionCost
    }
  }
`;

