import { gql } from "apollo-server-express";

// stations: ["강남역 2번출구", "인하대 후문"]
// locations: [x1, y1, x2, y2]

export default gql`
  type Mutation {
    createFund(stations: [String]!, locations: [Float]!): MutationResponse!
  }
`;
