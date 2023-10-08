import client from "../../client";

export default {
  Query: {
    seeFund: (_, { id }) =>
      client.fund.findUnique({
        where: {
          id,
        },
        include: { stations: true },
      }),
  },
};
