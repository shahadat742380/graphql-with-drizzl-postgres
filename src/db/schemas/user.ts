import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// import tables
// import { Books } from "./book";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").default(""),
  last_name: text("lat_name").default(""),
  email: text("email").default(""),
  password: text("password").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

// Relation
// export const userRelation = relations(Users, ({ many }) => ({
//   books: many(Books),
// }));
