import { gql } from "apollo-server-express";

export default gql`
  type Fund {
    id: Int!
    stations: [Station]
    fundAmount: Int!
    threshold: Int!
    users: [User]
    tickets: [Ticket]
    isEnd: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Station {
    id: Int!
    name: String!
    funds: [Fund]
    posX: Float!
    posY: Float!
  }

  type Ticket {
    id: Int!
    amount: Int!
    user: User
    fund: Fund
  }
`;
