import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import db from "../../db";
import logger from "../../logger";
import { isErrorWithMessage } from "../utils/typeGuards";

const PATH = "authentication/register";

export default async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  logger.info({
    path: PATH,
    data: { name, email, password },
  });

  if (!name || !email || !password) {
    throw new Error("Please enter all fields");
  }

  try {
    const accountExists = await db.account.getByEmail(email).catch(() => undefined);

    if (accountExists) {
      logger.error({
        path: PATH,
        msg: "Account already exists",
        data: { name, email, password },
      });

      return response.status(400).send();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: _, ...account } = await db.account.create({ name, email, hashedPassword });

    logger.info({
      path: PATH,
      msg: "Registered account Success",
      data: account,
    });

    return response.status(201).send();
  } catch (error) {
    logger.error({
      path: PATH,
      error,
      data: { name, email },
    });

    if (isErrorWithMessage(error)) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(400).json(error);
  }
};
