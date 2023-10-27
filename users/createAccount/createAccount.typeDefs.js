import { gql } from "apollo-server-express";

```
  회원가입
```;

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): MutationResponse!
  }
`;
