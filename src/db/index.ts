import { Client } from "pg";

const db = new Client({
  connectionString:
    "postgres://default:xaTMEqk4uD2L@ep-misty-meadow-a4o5rf4p.us-east-1.aws.neon.tech:5432/graphql-with-drizzle-postgres?sslmode=require",
});

export default db;
