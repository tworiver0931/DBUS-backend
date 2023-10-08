import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

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
