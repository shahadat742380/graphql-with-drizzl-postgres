import { drizzle } from "drizzle-orm/node-postgres";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Import schema
import * as dbSchema from "./db/schemas/index.js";
import db from "./db/index.js";

// import graphql typedef and resolver
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

const init = async () => {
  const PORT = Number(process.env.PORT) || 5000;

  try {
    await db.connect();

    // Initialize Drizzle-ORM with schema
    const graphqlDb = drizzle(db, { schema: dbSchema });

    const server = new ApolloServer<BaseContext>({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
      context: async ({ req, res }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization;

        // Add the token and db to the context
        return { db: graphqlDb, token };
      },
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

init();
