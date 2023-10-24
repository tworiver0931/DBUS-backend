import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeTicket: protectedResolver(async (_, { userId, fundId }) => {
      return await client.ticket.findUnique({
        where: {
          userId,
          fundId,
        },
      });
    }),
  },
};
