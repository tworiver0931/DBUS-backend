import { gql } from "apollo-server-express";

```
  노선 펀드 개설 기능
  stations: ["주안역", "인하대 후문"]
  locations: [x1, y1, x2, y2]
```;

export default gql`
  type Mutation {
    createFund(stations: [String]!, locations: [Float]!): MutationResponse!
  }
`;
