import {  serial, text, pgTable, timestamp  } from 'drizzle-orm/pg-core';

export const Books = pgTable('books', {
  id: serial('id').primaryKey(),
  author_name: text("author_name").default(""),
  title: text("title").default(""),
  year: text("year").default(""),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});