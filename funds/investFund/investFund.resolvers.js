import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    investFund: protectedResolver(async (_, { amount }, { loggedInUser }) => {
      // donate contract -> recieve updated infos of all funds.
      // Fund DB update
    }),
  },
};
