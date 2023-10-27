import { gql } from "apollo-server-express";

```
  노선 펀딩 기능
```;

export default gql`
  type Mutation {
    donateFund(fundId: Int!, amount: Int!): MutationResponse!
  }
`;
