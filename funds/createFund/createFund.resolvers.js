import client from "../../client";
import { createFund } from "../../contract/deploying/FundInteract";
import { protectedResolver } from "../../users/users.utils";
const { ethers } = require("ethers");

export default {
  Mutation: {
    createFund: protectedResolver(async (_, { stations, locations }) => {
      // Validate if fund is already exist.
      const existingFund = await client.fund.findFirst({
        where: {
          stations: {
            every: {
              name: {
                in: stations,
              },
            },
          },
        },
      });
      if (existingFund) {
        return {
          ok: false,
          error: "Fund already exists.",
        };
      }

      // Calculate distance, threshold, ...
      const distance = Math.sqrt(
        (locations[0] - locations[2]) ** 2 + (locations[1] - locations[3]) ** 2
      );
      const threshold = 10; // temporal

      // createFund contract -> recieve created fund info
      const createFundParam = {
        owner: process.env.SIGNER_ADDRESS,
        payee: process.env.SIGNER_ADDRESS,
        threshold: Math.floor(threshold),
      };
      const receipt = await createFund(createFundParam);
      console.log("[RECEIPT]", receipt.logs[0].topics);

      const fundId = Number(
        ethers.utils.defaultAbiCoder
          .decode(["uint96"], receipt.logs[0].topics[1])
          .toString()
      );
      const contractThreshold = Number(
        ethers.utils.defaultAbiCoder
          .decode(["uint256"], receipt.logs[0].topics[2])
          .toString()
      );
      // Update DB
      await client.fund.create({
        data: {
          id: fundId,
          threshold: contractThreshold,
          stations: {
            connectOrCreate: [
              {
                where: { name: stations[0] },
                create: {
                  name: stations[0],
                  posX: locations[0],
                  posY: locations[1],
                },
              },
              {
                where: { name: stations[1] },
                create: {
                  name: stations[1],
                  posX: locations[2],
                  posY: locations[3],
                },
              },
            ],
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
