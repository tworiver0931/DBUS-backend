import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import {
  safeTransferFrom,
  web3,
  withdraw,
} from "../../contract/deploying/TicketInteract";
import { checkBalanceOfUser } from "../../contract/deploying/check";

export default {
  Mutation: {
    transfer: protectedResolver(
      async (_, { fundId, amount, withdrawAddress }, { loggedInUser }) => {
        const user = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });

        const withdrawParam = {
          _fromPrivateKey: user.privateKey,
          _fromAddress: user.address,
          _toAddress: withdrawAddress,
          _id: fundId,
          _value: amount,
          _data: web3.utils.utf8ToHex("0"),
        };

        const receipt = await withdraw(withdrawParam);
        console.log(receipt);

        const updatedBalance = await checkBalanceOfUser(user.address, fundId);

        if (fundId === 0) {
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              tokenAmount: updatedBalance,
            },
          });
        } else {
          await client.ticket.updateMany({
            where: { userId: loggedInUser.id, fundId },
            data: {
              amount: updatedBalance,
            },
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};
