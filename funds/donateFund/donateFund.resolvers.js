import client from "../../client";
import { donate } from "../../contract/deploying/FundInteract";
import { checkBalanceOfUser, checkFund } from "../../contract/deploying/check";
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

        const { isEnd, donationAmount } = await checkFund(fundId);

        if (isEnd) {
          // get user's ticket info if fund completed
          const { userAddresses, ticketAmounts } = await getTicketAmounts(
            fundId
          );
          console.log("[][][][][][]", userAddresses, ticketAmounts);

          // USER, TICKET DB update if fund completed
          for (let i = 0; i < ticketAmounts.length; i++) {
            const user = await client.user.findUnique({
              where: {
                address: userAddresses[i],
              },
            });
            await client.ticket.create({
              data: {
                userId: user.id,
                fundId,
                amount: ticketAmounts[i],
              },
            });
          }
        }

        // Fund DB update
        await client.fund.update({
          where: { id: fundId },
          data: {
            isEnd,
            fundAmount: donationAmount,
            users: {
              connect: { id: loggedInUser.id },
            },
          },
        });

        // 토큰 조회
        const updatedBalance = await checkBalanceOfUser(user.address, 0);
        // DB update
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            tokenAmount: updatedBalance,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
