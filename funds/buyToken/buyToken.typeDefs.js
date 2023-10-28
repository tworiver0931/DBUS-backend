import { gql } from "apollo-server-express";

/*
  0번 토큰 구매 기능:
  signer에서 user로 토큰 transfer 후 DB 업데이트
*/

export default gql`
  type Mutation {
    buyToken(amount: Int!): MutationResponse!
  }
`;
