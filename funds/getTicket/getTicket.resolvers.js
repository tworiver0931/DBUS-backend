import client from "../../client";

export default {
  Query: {
    getTicket: protectedResolver(async (_, { userId, fundId }) => {
      return await client.ticket.findUnique({
        where: {
          userId,
          fundId,
        },
      });
    }),
  },
};
