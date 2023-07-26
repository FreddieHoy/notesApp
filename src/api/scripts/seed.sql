-- DROP DATABASE IF EXISTS postgres;

-- -- Create the db
-- CREATE DATABASE postgres;

-- -- Move into the db
-- \c postgres

-- -- drop tables if they exist 
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS notes;

-- (Re)Create Tables 

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