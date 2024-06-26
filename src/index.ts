import { drizzle } from "drizzle-orm/node-postgres";
import { buildSchema } from "drizzle-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Import schema
import * as dbSchema from "./db/schemas/index.js"
import db from "./db/index.js";



const init = async () => {
  const PORT = Number(process.env.PORT) || 5000;

  try {
    await db.connect();

    // Initialize Drizzle-ORM with schema
    const graphqlDb = drizzle(db, { schema: dbSchema });

    const { schema } = buildSchema(graphqlDb);
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to connect to the database", error);
  } finally {
    await db.end();
  }
};

init();