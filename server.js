require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import cors from "cors";

const startApolloServer = async () => {
  const PORT = process.env.PORT;

  const app = express();
  app.use(logger("tiny"));
  app.use(cors());

  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      if (req) {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      }
    },
  });

  await apollo.start();

  apollo.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${apollo.graphqlPath}`
    );
  });
};

startApolloServer();
