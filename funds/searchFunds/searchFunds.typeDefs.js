import { gql } from "apollo-server-express";

// locations: [x1, y1, x2, y2]

export default gql`
  type Query {
    searchFunds(locations: [Float]!, isEnd: Boolean): [Fund]
  }
`;
