CREATE SCHEMA IF NOT EXISTS note;

CREATE TABLE note.notes(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  userId TEXT NOT NULL,
  heading TEXT NOT NULL,
  content TEXT,
  to_do_item BOOLEAN NOT NULL,
  checked BOOLEAN
);

