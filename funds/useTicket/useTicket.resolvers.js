import client from "../../client";

export default {
  Mutation: {
    useTicket: protectedResolver(async (_, { fundId, userId }) => {
      // burn contract
    }),
  },
};
