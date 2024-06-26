import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import * as dbSchema from "../index.js";

const db = new Client({
  connectionString:
    "postgresql://postgres:742380@localhost:5432/drizzle-with-postgres?schema=public",
});

export const graphqlDb = drizzle(db, { schema: dbSchema });

export default db;
