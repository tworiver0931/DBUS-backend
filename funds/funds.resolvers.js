import client from "../client";

export default {
  Fund: {
    stations: ({ id }) =>
      client.station.findMany({
        where: {
          funds: {
            some: {
              id,
            },
          },
        },
      }),
    users: ({ id }) =>
      client.user.findMany({
        where: {
          funds: {
            some: {
              id,
            },
          },
        },
      }),
  },

  Station: {
    funds: ({ id }) =>
      client.station
        .findUnique({
          where: {
            id,
          },
        })
        .funds(),
  },

  Ticket: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
  },
};
