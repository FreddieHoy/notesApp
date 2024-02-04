"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: process.env.POSTGRES_USER || "freddie",
    database: process.env.POSTGRES_DB || "jotterdb",
    password: process.env.POSTGRES_PASSWORD || "freddieLovesCake",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
});
exports.secret = process.env.JWT_SECRET || "dev_secret123";
