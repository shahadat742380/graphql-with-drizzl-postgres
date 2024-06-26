import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schemas',
  out: './drizzle',
  dialect: 'postgresql', 
  dbCredentials: {
    host: "localhost",
    user: "postgres",
    password: "742380",
    database: "drizzle-with-postgres",
    ssl: false,
  },
} satisfies Config;
