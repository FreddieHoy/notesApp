import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./config";
import router from "./src/routes";

const port = process.env.PORT;
const clientOrigin = process.env.CLIENT_ORIGIN;

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
    origin: true,
    credentials: true,
  })
);

app.get("/", (_request, response) => {
  console.log("hit node api");
  response.json({ info: "Node.js, Express, and Postgres API" }).end();
});

app.use(router);

app.listen(port, () => {
  console.log(`API now running on port ${port}.`);
});
