import client from "../../client";
import { burn } from "../../contract/deploying/FundInteract";
import { protectedResolver } from "../../users/users.utils";

require("dotenv").config();

export default {
  Mutation: {
    useTicket: protectedResolver(async (_, { userId, fundId }) => {
      const user = await client.user.findUnique({
        where: {
          id: userId,
        },
      });

      // burn contract
      const burnParams = {
        _user: user.address,
        _amount: 1,
        _fundId: fundId,
      };
      const burnReceipt = burn(burnParams);
      console.log(burnReceipt);

      // DB update
      const existingTicket = await client.ticket.findUnique({
        where: { userId, fundId },
      });
      const newAmount = existingTicket.amount - 1;
      await client.ticket.update({
        where: { userId, fundId },
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
