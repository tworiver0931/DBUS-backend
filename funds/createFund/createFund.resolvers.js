import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import {createFund} from '../../contract/deploying/FundInteract'


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
      

      // createFund contract -> recieve created fund info
      const param = {
        owner: "0xddF2b929370CF0962F0A87A49f388CA191432008",
        payee: "0xddF2b929370CF0962F0A87A49f388CA191432008",
        threshold: 100
        //data: web3.utils.utf8ToHex('1')
        }
      await createFund(param)


      // Update DB
      await client.fund.create({
        data: {
          // id: recieved fund id
          threshold: 100,
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
