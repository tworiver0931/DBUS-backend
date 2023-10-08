import { gql } from "apollo-server-express";

export default gql`
  type Fund {
    id: Int!
    stations: [Station]
    fundAmount: Int!
    threshold: Int!
    users: [User]
    isEnd: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Station {
    id: Int!
    name: String!
    funds: [Fund]
  }

  type Ticket {
    id: Int!
    fundId: Int!
    amount: Int!
    user: User
  }
`;
