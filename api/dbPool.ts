import { Pool } from "pg";

export const pool = new Pool({
  user: "freddie", //process.env.POSTGRES_USER ||
  host: "postgres", //process.env.POSTGRES_HOST ||
  database: "postgres", //process.env.POSTGRES_DB ||
  password: "freddielovescake", //process.env.POSTGRES_PASSWORD ||
  port: 5432,
});

export const secret = process.env.JWT_SECRET || "dev_secret123";
