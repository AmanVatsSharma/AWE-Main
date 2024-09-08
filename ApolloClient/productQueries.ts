import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String
    $price: Float!
    $imageUrl: [String]
    $stockQuantity: Int
    $categoryId: Int
    $variantInputs: [CreateProductVariantInput]
    $collectionIds: [Int]
    $tagIds: [Int]
  ) {
    createProduct(
      input: {
        name: $name
        description: $description
        price: $price
        imageUrl: $imageUrl
        stockQuantity: $stockQuantity
        categoryId: $categoryId
        variantInputs: $variantInputs
        collectionIds: $collectionIds
        tagIds: $tagIds
      }
    ) {
      id
      name
      description
      price
      imageUrl
      stockQuantity
      category {
        id
      }
      variants {
        id
        price
      }
      collections {
        id
      }
      tags {
        id
        name
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($searchTerm: String!) {
    searchProducts(searchTerm: $searchTerm, perPage: 5) {
      edges {
        node {
          id
          name
          description
          price
          imageUrl
        }
      }
    }
  }
`;

export const GetProducts = gql`
  query GetProducts($perPage: Int!, $page: Int!) {
    products(perPage: $perPage, page: $page) {
      edges {
        node {
          id
          name
          description
          price
          imageUrl
          stockQuantity
          variants {
            sku
            stockQuantity
          }
          category {
            name
          }
          collections {
            title
          }
          tags {
            name
          }
        }
      }
      totalCount
    }
  }
`;

export const GET_PRODUCT = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
    name
    description
    price
    imageUrl
    stockQuantity
    variants{
      id
      sku
      size
      color
      price
      stockQuantity
    }
    category{
      name
    }
    collections{
      title
    }
    tags{
      name
    }
    averageRating
    salesCount
    revenue
    }
  }
`;

export const GET_PRODUCTS_STORE = gql`
  query GetProducts($perPage: Int!, $page: Int!) {
    products(perPage: $perPage, page: $page) {
      edges {
        node {
          id
          name
          description
          price
          imageUrl
          stockQuantity
        }
      }
      totalCount
    }
  }
`;
