import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    donateFund(fundId: Int!, amount: Int!): MutationResponse!
  }
`;
