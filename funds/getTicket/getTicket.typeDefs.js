import { gql } from "apollo-server-express";

/*
  티켓 정보 조회
*/

export default gql`
  type Query {
    getTicket(userId: Int!, fundId: Int!): Ticket
  }
`;
