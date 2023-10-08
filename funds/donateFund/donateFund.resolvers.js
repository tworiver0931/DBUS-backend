import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    donateFund: protectedResolver(
      async (_, { fundId, amount }, { loggedInUser }) => {
        // donate contract -> receive updated info of certain fund.
        // Fund DB update
      }
    ),
  },
};
