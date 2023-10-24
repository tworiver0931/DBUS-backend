import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    useTicket(userId: Int!, fundId: Int!): MutationResponse!
  }
`;
