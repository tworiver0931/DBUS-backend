import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeFund(id: Int!): Fund
  }
`;
