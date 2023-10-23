import { gql } from "apollo-server-express";

export default gql`
  type Query {
    useTicket(fundId: Int!, userId: Int!): MutationResponse!
  }
`;
