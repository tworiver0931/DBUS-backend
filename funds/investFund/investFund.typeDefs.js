import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    investFund(amount: Int!): MutationResponse!
  }
`;
