import client from "../../client";
import { donate } from "../../contract/deploying/FundInteract";
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

        // donate contract -> receive updated info of certain fund.
        const donateParam = {
          _user: user.address,
          _fundId: fundId,
          _fundAmount: amount,
        };
        await donate(donateParam);

        // Fund DB update
      }
    ),
  },
};
