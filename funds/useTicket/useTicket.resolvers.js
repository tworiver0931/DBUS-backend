import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    useTicket: protectedResolver(async (_, { userId, fundId }) => {
      // burn contract
    }),
  },
};
