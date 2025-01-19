import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../../../dbPool";
import db from "../../db";
import logger from "../../logger";

const PATH = "auth/login";

export default async (request: Request, response: Response) => {
  const { email, password } = request.body as { email: string; password: string };
  console.log("hello");

  logger.info({
    path: PATH,
    data: { email, password },
  });

  try {
    console.log("hello123");
    const account = await db.account.getByEmail(email);
    const { password: hashedPassword } = account;
    console.log("hello");
    const correct = await bcrypt.compare(password, hashedPassword);
    console.log("hello1");

    if (!correct) {
      const message = "Incorrect password";
      response.status(500).json({
        message,
      });

      logger.error({
        path: PATH,
        message,
      });

      response.end();
      return;
    }
    console.log("hello2");

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
      path: PATH,
      error: e,
    });

    return response.status(400);
  }
};
