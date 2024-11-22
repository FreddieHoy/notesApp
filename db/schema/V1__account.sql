CREATE SCHEMA IF NOT EXISTS account;

CREATE TABLE account.accounts(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT,
  password TEXT
);

