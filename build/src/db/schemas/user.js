"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.Users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    first_name: (0, pg_core_1.text)("first_name").default(""),
    last_name: (0, pg_core_1.text)("lat_name").default(""),
    email: (0, pg_core_1.text)("email").default(""),
    createdAt: (0, pg_core_1.text)("created_at").default((0, drizzle_orm_1.sql) `CURRENT_TIME`),
    updatedAt: (0, pg_core_1.text)("updated_at").default((0, drizzle_orm_1.sql) `CURRENT_TIME`),
});
