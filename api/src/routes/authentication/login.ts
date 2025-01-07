import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../../../dbPool";
import db from "../../db";
import logger from "../../logger";

export default async (request: Request, response: Response) => {
  const { email, password } = request.body as { email: string; password: string };

  logger.info({
    path: "login",
    data: { email, password },
  });

  try {
    const account = await db.account.getByEmail(email);
    const { password: hashedPassword } = account;

    const correct = await bcrypt.compare(password, hashedPassword);

    if (!correct) {
      const message = "Incorrect password";
      response.status(500).json({
        message,
      });

      logger.error({
        path: "login",
        message,
      });

      response.end();
      return;
    }

    const token = jwt.sign({ sub: account.id }, secret, {
      expiresIn: "6h",
    });

    response.cookie("authToken", token, { httpOnly: true, secure: true });

    response.json({
      message: `Welcome back ${account.name}! (With Cookie)`,
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
      },
    });
  } catch (e) {
    logger.error({
      path: "login",
      error: e,
    });
    throw e;
  }
};
