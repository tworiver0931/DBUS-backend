import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getTicket(userId: Int!, fundId: Int!): Ticket
  }
`;
