import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    transfer(
      fundId: Int!
      amount: Int!
      withdrawAddress: String!
    ): MutationResponse!
  }
`;
