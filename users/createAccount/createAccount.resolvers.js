import bcrypt from "bcrypt";
import web3 from "../../web3Provider";
import client from "../../client";
import { firstApproval } from "../../contract/deploying/firstApproval";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        // create wallet
        const wallet = web3.eth.accounts.wallet.create(1);
        const address = wallet[0].address.toLowerCase();
        const privateKey = wallet[0].privateKey;

        // approval
        await firstApproval(
          process.env.SIGNER_PRIVATE_KEY,
          address,
          privateKey,
          "0.01",
          true
        );

        await client.user.create({
          data: {
            username,
            email,
            address,
            privateKey,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "Cant create account.",
        };
      }
    },
  },
};
