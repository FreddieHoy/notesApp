import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { pool } from "../../../dbPool";
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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const results = await pool.query(`SELECT * FROM account.accounts WHERE email = $1`, [email]);

    if (results.rows.length > 0) {
      logger.error({
        path: PATH,
        data: { name, email, password },
      });

      return response.status(400).send();
    }

    const res = await pool.query(
      "INSERT INTO account.accounts (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const account = res.rows[0];

    if (!account) throw new Error("Failed to register user");

    const newUserId = res.rows[0].id;

    return response.status(201).send(`User added with ID: ${newUserId ?? "unknown"}`);
  } catch (error) {
    logger.error({
      path: PATH,
      error,
    });

    if (isErrorWithMessage(error)) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(400).json(error);
  }
};
