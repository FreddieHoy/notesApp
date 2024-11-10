import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../../dbPool";
import { isJWTPayload } from "./utils/typeGuards";

export const secureRoute = async (request: Request, response: Response, next: NextFunction) => {
  console.log("START");

  if (!request.cookies.authToken) {
    return response.sendStatus(401);
  }
  console.log("1");

  const token: string = request.cookies.authToken;
  console.log("2");

  try {
    const payload = await jwt.verify(token, secret);
    console.log("3", payload, token);

    if (token && isJWTPayload(payload)) {
      const results = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [
        payload.sub,
      ]);
      const account = results.rows[0];

      console.log("Account", account);
      if (!account) return response.sendStatus(404).json("No account found please login again");

      request.decodedAccountId = payload.sub;
      console.log("4");

      next();
    }
  } catch (e) {
    console.log("Secure Route Error", e);
    return response.sendStatus(401);
  }
};
