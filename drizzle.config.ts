import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schemas/index.ts',
  out: './drizzle',
  dialect: 'postgresql', 
  dbCredentials: {
    url: "postgres://default:xaTMEqk4uD2L@ep-misty-meadow-a4o5rf4p.us-east-1.aws.neon.tech:5432/graphql-with-drizzle-postgres?sslmode=require"
  },
  verbose: true,
  strict: true,
  migrations: {
    table: 'drizzle_migrations',
    schema: 'public',
  },
  tablesFilter: [ 'public', 'tembo'],
} satisfies Config;
