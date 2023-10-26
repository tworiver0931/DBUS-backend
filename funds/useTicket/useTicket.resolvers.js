import client from "../../client";
import { safeTransferFrom } from "../../contract/deploying/TicketInteract";
import { protectedResolver } from "../../users/users.utils";
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const network = process.env.ETHEREUM_NETWORK;
require("dotenv").config();
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);

export default {
  Mutation: {
    useTicket: protectedResolver(async (_, { userId, fundId }) => {
      const user = await client.user.findUnique({
        where: {
          id: userId,
        },
      });

      // burn contract
      const ticketContractAddressPath = path.join(
        path.dirname(__dirname),
        "..",
        "contract",
        "artifacts",
        "FundRegistryAddress.bin"
      );
      console.log(ticketContractAddressPath);
      const ticket_contract_address = fs.readFileSync(
        ticketContractAddressPath,
        "utf8"
      );

      const safeTransferFromParam = {
        _from: ticket_contract_address,
        _to: user.address,
        _id: fundId,
        _value: 1,
        _data: web3.utils.utf8ToHex("0"),
      };

      const receipt = await safeTransferFrom(safeTransferFromParam);
      console.log(receipt);

      // DB update
      const existingTicket = await prisma.ticket.findUnique({
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
