import { Client } from "pg";

const db = new Client({
  connectionString:
    "postgresql://postgres:742380@localhost:5432/drizzle-with-postgres?schema=public",
});

export default db;
