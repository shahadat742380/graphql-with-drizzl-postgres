"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
};
