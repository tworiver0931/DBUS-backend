import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    address: String!
    createdAt: String!
    updatedAt: String!
    isMe: Boolean!
  }
`;
