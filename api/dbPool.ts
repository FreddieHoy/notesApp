import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRES_USER || "freddie",
  host: process.env.POSTGRES_HOST || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  password: process.env.POSTGRES_PASSWORD || "freddielovescake",
  port: 5432,
});

export const secret = process.env.JWT_SECRET || "dev_secret123";
