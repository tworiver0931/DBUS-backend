import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    useTicket: protectedResolver(async (_, { userId, fundId }) => {
      // burn contract

      // DB update
      const existingTicket = await prisma.ticket.findUnique({
        where: { userId },
      });
      const newAmount = existingTicket.amount - 1;
      await client.ticket.update({
        where: { userId },
        data: {
          amount: newAmount,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
