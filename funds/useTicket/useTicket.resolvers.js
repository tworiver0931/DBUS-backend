import client from "../../client";
import { burn } from "../../contract/deploying/FundInteract";
import { checkBalanceOfUser } from "../../contract/deploying/check";

require("dotenv").config();

export default {
  Mutation: {
    useTicket: async (_, { userId, fundId }) => {
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
      const burnReceipt = await burn(burnParams);
      console.log(burnReceipt);

      // DB update
      const updatedBalance = await checkBalanceOfUser(user.address, fundId);
      await client.ticket.updateMany({
        where: { userId, fundId },
        data: {
          amount: updatedBalance,
        },
      });

      return {
        ok: true,
      };
    },
  },
};
