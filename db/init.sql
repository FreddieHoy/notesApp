-- Create user
CREATE USER dba CREATEROLE CREATEDB PASSWORD 'freddieLovesCake';
CREATE USER jotter PASSWORD 'freddieLovesCake';

-- -- Create the db
CREATE DATABASE jotterdb ENCODING 'UTF8';
GRANT ALL ON DATABASE jotterdb TO dba WITH GRANT OPTION;
GRANT ALL ON DATABASE jotterdb TO jotter WITH GRANT OPTION;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\connect jotterdb


