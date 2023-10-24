import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeTicket(userId: Int!, fundId: Int!): Ticket
  }
`;
