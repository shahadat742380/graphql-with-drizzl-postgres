"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db = new pg_1.Client({
    connectionString: "postgresql://postgres:742380@localhost:5432/drizzle-with-postgres?schema=public",
});
exports.default = db;
