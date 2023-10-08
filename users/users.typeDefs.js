import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    address: String!
    privateKey: String!
    tokenAmount: Int!
    createdAt: String!
    updatedAt: String!
    isMe: Boolean!
    funds: [Fund]
    tickets: [Ticket]
  }
`;
