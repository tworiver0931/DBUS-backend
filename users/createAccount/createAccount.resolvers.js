import bcrypt from "bcrypt";
import web3 from "../../web3Provider";
import client from "../../client";
import { firstApproval } from "../../contract/deploying/firstApproval";
import { generateNewUser } from "../../contract/deploying/generateAndSend";

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
        const newUser = generateNewUser();

        // approval
        await firstApproval(
          process.env.SIGNER_PRIVATE_KEY,
          newUser.address.toLowerCase(),
          newUser.privateKey,
          "0.01",
          true
        );

        await client.user.create({
          data: {
            username,
            email,
            address: newUser.address.toLowerCase(),
            privateKey: newUser.privateKey,
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
