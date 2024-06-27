"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.Books = (0, pg_core_1.pgTable)('books', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    author_name: (0, pg_core_1.text)("author_name").default(""),
    title: (0, pg_core_1.text)("title").default(""),
    year: (0, pg_core_1.text)("year").default(""),
    createdAt: (0, pg_core_1.text)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIME`),
    updatedAt: (0, pg_core_1.text)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIME`),
});
