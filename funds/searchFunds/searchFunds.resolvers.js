import client from "../../client";

// 1. Find the all existing funds.
// 2. Sort it via similarity with given locations then return.

export default {
  Query: {
    searchFunds: async (_, { locations, isEnd }) => {
      var funds = await client.fund.findMany({
        include: {
          stations: true,
        },
      });

      const distance = (x1, y1, x2, y2) =>
        Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      const similarity = (loc11, loc12, loc21, loc22) => {
        const d11 = distance(loc11[0], loc11[1], loc21[0], loc21[1]);
        const d12 = distance(loc12[0], loc12[1], loc22[0], loc22[1]);
        const sim1 = d11 + d12;

        const d21 = distance(loc11[0], loc11[1], loc22[0], loc22[1]);
        const d22 = distance(loc12[0], loc12[1], loc21[0], loc21[1]);
        const sim2 = d21 + d22;

        if (sim1 < sim2) return sim1;
        else return sim2;
      };
      const sortingFunc = (prev, cur) => {
        const prev_sim = similarity(
          locations.slice(0, 2),
          locations.slice(2, 4),
          [prev.stations[0].posX, prev.stations[0].posY],
          [prev.stations[1].posX, prev.stations[1].posY]
        );
        const cur_sim = similarity(
          locations.slice(0, 2),
          locations.slice(2, 4),
          [cur.stations[0].posX, cur.stations[0].posY],
          [cur.stations[1].posX, cur.stations[1].posY]
        );
        if (prev_sim > cur_sim) return 1;
        if (prev_sim < cur_sim) return -1;
      };

      funds = funds.sort(sortingFunc);
      return funds;
      /*
      const stations = await client.station.findMany();
      const stationIds = stations.map((station) => station.id);
      stationIds.sort((prev, cur) => {
        if(prev.location)
      })

      const filter = {
        stations: {
          some: {
            id: {
              in: stationIds,
            },
          },
        },
      };
      if (isEnd) {
        filter.isEnd = isEnd;
      }

      const funds = await client.fund.findMany({
        where: filter,
      });
      return funds;
      */
    },
  },
};
