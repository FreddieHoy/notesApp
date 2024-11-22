import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotEnv from "dotenv";
import express from "express";
import { router } from "./src/routes/index.ts";

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
