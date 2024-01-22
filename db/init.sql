-- Create user
CREATE USER freddie PASSWORD 'freddieLovesCake';

-- -- Create the db
CREATE DATABASE jotterdb ENCODING 'UTF8';

-- -- Move into the db
-- \c postgres

\connect tranch

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(50),
  password VARCHAR(100),
  token VARCHAR(200)
);

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  userId VARCHAR(100) NOT NULL,
  heading VARCHAR(100) NOT NULL,
  content VARCHAR(450),
  todoitem BOOLEAN NOT NULL,
  checked BOOLEAN
);