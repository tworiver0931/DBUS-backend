import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getTicket: protectedResolver(async (_, { userId, fundId }) => {
      return client.ticket.findUnique({
        where: {
          userId,
          fundId,
        },
      });
    }),
  },
};
