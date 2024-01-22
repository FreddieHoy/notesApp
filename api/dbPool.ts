import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRES_USER || "freddie",
  database: process.env.POSTGRES_DB || "jotterdb",
  password: process.env.POSTGRES_PASSWORD || "freddielovescake",
  host: process.env.POSTGRES_HOST || "localhost",
  port: 5432,
});

export const secret = process.env.JWT_SECRET || "dev_secret123";
