# Getting started locally

- Clone, cd in, install node modules.

Then need to connect and run docker, then run the BE, FE css and FE.


#### Big issues

- Auth - Solved using cookies

- sharing types with the BE
  
- URL management. Everything is just '/'


---

## API notes

Pretty fun just hammering away for a bit making end points for notes and users.

Started off using brew to run the DB.

`brew services list` to see my running database

Use `brew services start` 

`psql postgres`

check what users are installed - \du (inside Postgres)

Basically all the good set up notes were here for interacting with the database - https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

#### Started using docker

Okay after having issues with software versioning I was told the best thing to do is to run the DB on Docker. They you get an nice image and container you can connect to and don't have to worry about the version of node etc..

I've got it running in docker now. That took a day lol.

Okay here's how to run the docker instance

Start docker container using this:
docker run --name notesdb -d -p 5432:5432 -e POSTGRES_PASSWORD=<<<>>> -e POSTGRES_USER=freddie -d postgres

HOW TO OPEN TERMINAL IN DOCKER
docker exec -it notesdb bash or
docker exec -it notesdb psql -U Freddie

Issue with local host FE pointing at localhost BE is that firstly you have to ask it to save the auth cookies and second the dreaded CORS issues. 

