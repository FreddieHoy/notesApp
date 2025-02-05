import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../../dbPool";
import logger from "../logger";
import { isJWTPayload } from "./utils/typeGuards";

const PATH = "/secureRoute";

export const secureRoute = async (request: Request, response: Response, next: NextFunction) => {
  logger.info({
    path: PATH,
    message: "Check request authorization",
  });

  if (!request.cookies.authToken) {
    console.log("request.cookies", request.cookies);
    logger.error({
      path: PATH,
      message: "No token found",
    });
    return response.sendStatus(401);
  }

  const token: string = request.cookies.authToken;

  // This just unencrypts the token to check the id matches
  try {
    const payload = await jwt.verify(token, secret);

    if (token && isJWTPayload(payload)) {
      const results = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [
        payload.sub,
      ]);

      const account = results.rows[0];

      if (!account) return response.sendStatus(404).json("No account found please login again");

      request.decodedAccountId = payload.sub;

      logger.info({
        path: PATH,
        message: "Request authorized",
      });

      next();
    }
  } catch (e) {
    logger.error({
      path: PATH,
      message: "Failed to authorize request",
    });
    return response.sendStatus(401);
  }
};
