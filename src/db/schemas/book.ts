import { sql } from "drizzle-orm";
import { serial, text, pgTable, timestamp, integer } from "drizzle-orm/pg-core";
// import { Users } from "./user";
// import { relations } from "drizzle-orm";

export const Books = pgTable("books", {
  id: serial("id").primaryKey(),
  author_name: text("author_name").default(""),
  // author_id: integer("author_id").references(()=> Users.id),
  title: text("title").default(""),
  year: text("year").default(""),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

// Relation
// export const booksRelations = relations(Books, ({ one }) => ({
//   author: one(Users, {
//     fields: [Books.author_id],
//     references: [Users.id],
//   }),
// }));
