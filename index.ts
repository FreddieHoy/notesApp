import express from "express";
import bodyParser from "body-parser";
import { router } from "./api/Routing/Router";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";

dotEnv.config();

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use(router);

app.listen(port, () => {
  console.log(`API now running on port ${port}.`);
});
