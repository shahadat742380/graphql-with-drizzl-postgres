import {  serial, text, pgTable } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: text("first_name").default(""),
  last_name: text("lat_name").default(""),
  email: text("email").default(""),
  createdAt: text("created_at").default(sql`CURRENT_TIME`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIME`),
});