import bcrypt from "bcrypt";
import lightwallet from "eth-lightwallet";
import fs from "fs";

import client from "../../client";

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

        //지갑 생성
        let address;
        let keystore;
        // const mnemonic = lightwallet.keystore.generateRandomSeed();
        // lightwallet.keystore.createVault(
        //   {
        //     password: password,
        //     seedPhrase: mnemonic,
        //     hdPathString: "m/0'/0'/0'",
        //   },
        //   function (err, ks) {
        //     ks.keyFromPassword(password, function (err, pwDerivedKey) {
        //       console.log("KS1:", ks);
        //       ks.generateNewAddress(pwDerivedKey, 1);
        //       console.log("KS2:", ks);

        //       address = ks.getAddresses().toString();
        //       keystore = ks.serialize();

        //       fs.writeFile("wallet.json", keystore, function (err, data) {
        //         if (err) console.log("에러");
        //         else console.log("성공");
        //       });
        //     });
        //   }
        // );

        await client.user.create({
          data: {
            username,
            email,
            address,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Cant create account.",
        };
      }
    },
  },
};
