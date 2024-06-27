import {  serial, text, pgTable } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";

export const Books = pgTable('books', {
  id: serial('id').primaryKey(),
  author_name: text("author_name").default(""),
  title: text("title").default(""),
  year: text("year").default(""),
  createdAt: text("created_at").default(sql`CURRENT_TIME`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIME`),
});