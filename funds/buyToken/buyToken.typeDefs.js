import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    buyToken(amount: Int!): MutationResponse!
  }
`;
