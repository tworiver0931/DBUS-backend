import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeProfile: protectedResolver((_, __, { loggedInUser }) =>
      client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
        include: {
          funds: true,
          tickets: true,
        },
      })
    ),
  },
};
