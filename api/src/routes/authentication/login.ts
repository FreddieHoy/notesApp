import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../../../dbPool";
import db from "../../db";
import logger from "../../logger";

const sevenDays = 7 * 24 * 60 * 60 * 1000;

const PATH = "auth/login";

export default async (request: Request, response: Response) => {
  const { email, password } = request.body as { email: string; password: string };

  logger.info({
    path: PATH,
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
        path: PATH,
        message,
      });

      response.end();
      return;
    }

    const token = jwt.sign({ sub: account.id }, secret, {
      expiresIn: "6h",
    });

    const { password: _, ...accountWithoutPassword } = account;

    response.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: sevenDays,
    });
    response.cookie("user_data", JSON.stringify(accountWithoutPassword), {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: sevenDays,
    });

    response.json({
      message: `Welcome back ${account.name}!`,
      account: accountWithoutPassword,
    });
  } catch (e) {
    logger.error({
      path: PATH,
      error: e,
    });

    return response.status(400);
  }
};
