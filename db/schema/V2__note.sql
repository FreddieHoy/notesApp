CREATE SCHEMA IF NOT EXISTS note;

CREATE TABLE note.notes(
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  heading TEXT NOT NULL,
  content TEXT,
  account_id uuid NOT NULL
);

-- PURPOSE: Constraints
ALTER TABLE note.notes 
  ADD CONSTRAINT note_notes_account_id_fkey FOREIGN KEY (account_id) 
  REFERENCES account.accounts (id) 
  ON DELETE CASCADE;

