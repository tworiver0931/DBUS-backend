import client from "../../client";
import { donate } from "../../contract/deploying/FundInteract";
import { getTicketAmounts } from "../../contract/deploying/getTicketAmount";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    donateFund: protectedResolver(
      async (_, { fundId, amount }, { loggedInUser }) => {
        //loggedInUser id로 address 찾기
        const user = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });

        // donate contract
        const donateParam = {
          _user: user.address,
          _fundId: fundId,
          _fundAmount: amount,
        };
        const receipt = await donate(donateParam);
        console.log(receipt);

        // get user's ticket info if fund completed
        const { userAddresses, ticketAmounts } = await getTicketAmounts(fundId);

        // Fund DB update
        for (let i = 0; i < ticketAmounts.length; i++) {
          const user = await client.user.findUnique({
            where: { address: userAddresses[i] },
          });
          await client.ticket.create({
            data: {
              userId: user.id,
              fundId,
              amount: ticketAmounts[i],
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
