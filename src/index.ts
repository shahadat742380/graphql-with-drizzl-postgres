import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { buildSchema } from "drizzle-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// Import schema
import * as dbSchema from "./schemas/index.js";

const client = new Client({
  connectionString:
    "postgresql://postgres:742380@localhost:5432/drizzle-with-postgres?schema=public",
  ssl: false, // Disable SSL
});

const init = async () => {
  const PORT = Number(process.env.PORT) || 5000;

  try {
    await client.connect();

    // Initialize Drizzle-ORM with schema
    const db = drizzle(client, { schema: dbSchema });

    const { schema } = buildSchema(db);
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to connect to the database", error);
  } finally {
    await client.end();
  }
};

init();
