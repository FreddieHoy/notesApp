import express from "express";
import bodyParser from "body-parser";
import { router } from "./src/Routing/Router";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import cors from "cors";

const port = 8000;

dotEnv.config();

export const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (_request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use(router);

app.listen(port, () => {
  console.log(`API now running on port ${port}.`);
});
