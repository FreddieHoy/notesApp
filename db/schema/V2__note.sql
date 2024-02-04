CREATE SCHEMA IF NOT EXISTS note;

CREATE TABLE note.notes(
  ID SERIAL PRIMARY KEY,
  userId TEXT NOT NULL,
  heading TEXT NOT NULL,
  content TEXT,
  to_do_item BOOLEAN NOT NULL,
  checked BOOLEAN
);

