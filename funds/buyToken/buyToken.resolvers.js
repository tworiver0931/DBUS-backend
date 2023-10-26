import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import {
  safeTransferFrom,
  web3,
} from "../../contract/deploying/TicketInteract";

export default {
  Mutation: {
    buyToken: protectedResolver(async (_, { amount }, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });

      const safeTransferFromParam = {
        _from: process.env.SIGNER_ADDRESS,
        _to: user.address,
        _id: 0,
        _value: amount,
        _data: web3.utils.utf8ToHex("0"),
      };

      const receipt = await safeTransferFrom(safeTransferFromParam);
      console.log(receipt);

      return {
        ok: true,
      };
    }),
  },
};
