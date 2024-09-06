
import { gql } from "@apollo/client";

export const GET_CATEGORIES_LIST = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;
