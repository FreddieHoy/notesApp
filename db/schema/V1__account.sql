CREATE SCHEMA IF NOT EXISTS account;

CREATE TABLE account.accounts(
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT,
  email TEXT,
  password TEXT,
  token TEXT
);

