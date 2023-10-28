import { gql } from "apollo-server-express";

/*
  유사 노선 검색 기능
  locations: [x1, y1, x2, y2]
*/

export default gql`
  type Query {
    searchFunds(locations: [Float]!, isEnd: Boolean): [Fund]
  }
`;
