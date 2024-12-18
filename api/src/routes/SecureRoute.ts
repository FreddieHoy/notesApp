import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../../dbPool";
import { isJWTPayload } from "./utils/typeGuards";

export const secureRoute = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.cookies.authToken) {
    return response.sendStatus(401);
  }

  const token: string = request.cookies.authToken;

  try {
    const payload = await jwt.verify(token, secret);

    if (token && isJWTPayload(payload)) {
      const results = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [
        payload.sub,
      ]);
      const account = results.rows[0];

      if (!account) return response.sendStatus(404).json("No account found please login again");

      request.decodedAccountId = payload.sub;

      next();
    }
  } catch (e) {
    return response.sendStatus(401);
  }
};
