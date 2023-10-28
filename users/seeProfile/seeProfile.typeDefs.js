import { gql } from "apollo-server-express";

/*
  프로필 조회
*/

export default gql`
  type Query {
    seeProfile: User
  }
`;
