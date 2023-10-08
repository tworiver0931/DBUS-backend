import client from "../client";

export default {
  User: {
    funds: ({ id }) =>
      client.fund.findMany({
        where: {
          users: {
            some: { id },
          },
        },
      }),
    tickets: ({ id }) => client.user.findUnique({ where: { id } }).tickets(),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
  },
};
