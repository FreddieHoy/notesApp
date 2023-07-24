### Getting started locally

- Clone, cd in, install node modules.

Then need to connect and run docker, then run the BE, FE css and FE.


# FrontEnd notes

### Colors

So tailwind provides a color pallet and theming. But the issue is I don't know what my primary theme colors are. So I'm going to outline them here. FYI just going to steal some nice colors themes from the internet.

So to save time I'm going to stick with the standard colors that come with tailwind instead of configuring the color scheme. I'm just going to write down the ones that I use a lot of keep things matching.

So light theme.
- gray-300
- gray-100
- indigo-300
- indigo-100
  
- text - gray-200
- light text - gray-400
- border - gray-200


Dark theme.
- gray-900
- gray-800
- indigo-900
- indigo-700
  
- text - gray-200
- border - gray-600




---

# Backend Notes

### Journey with using docker

Started off using brew to run the DB locally on my machine

`brew services list` to see my running database

Use `brew services start` 

`psql postgres`

check what users are installed - \du (inside Postgres)

Basically all the good set up notes were here for interacting with the database - https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

Okay after having issues with software versioning I was told the best thing to do is to run the DB on Docker. They you get an nice image and container you can connect to and don't have to worry about the version of node etc..

I've got it running in docker now. That took a day lol.

Okay here's how to run the docker instance

Start docker container using this:
docker run --name notesdb -d -p 5432:5432 -e POSTGRES_PASSWORD=<<<>>> -e POSTGRES_USER=freddie -d postgres

HOW TO OPEN TERMINAL IN DOCKER
docker exec -it notesdb bash or
docker exec -it notesdb psql -U Freddie

Issue with local host FE pointing at localhost BE is that firstly you have to ask it to save the auth cookies and second the dreaded CORS issues. 

