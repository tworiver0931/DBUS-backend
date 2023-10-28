import { gql } from "apollo-server-express";

/*
  티켓 사용 기능
*/

export default gql`
  type Mutation {
    useTicket(userId: Int!, fundId: Int!): MutationResponse!
  }
`;
