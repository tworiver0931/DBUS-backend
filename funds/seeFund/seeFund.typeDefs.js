import { gql } from "apollo-server-express";

/*
  노선 펀드 조회
*/

export default gql`
  type Query {
    seeFund(id: Int!): Fund
  }
`;
