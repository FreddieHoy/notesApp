import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool, secret } from "../../../dbPool";
import db from "../../db";
import logger from "../../logger";
import { isErrorWithMessage } from "../utils/typeGuards";

export const getMe = async (request: Request, response: Response) => {
  const accountId = request.decodedAccountId;

  logger.info({
    path: "/me",
  });

  const res = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [accountId]);

  if (!res.rows.length) throw new Error("No account found with this token");

  const account = res.rows[0];

  return response.status(200).json(account);
};

export const logIn = async (request: Request, response: Response) => {
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

    response.cookie("authToken", token, { httpOnly: true });

    response.json({
      message: `Welcome back ${account.name}! (With Cookie)`,
      account,
    });
  } catch (e) {
    logger.error({
      path: "login",
      error: e,
    });
    throw e;
  }
};

export const logOut = (request: Request, response: Response) => {
  const userId = request.body.userId;

  logger.info({
    path: "logOut",
    data: { userId },
  });

  if (!userId) {
    throw new Error("No user id found");
  }

  pool.query("UPDATE account SET token = NULL WHERE id = $1", [userId], (error, res) => {
    if (error) {
      throw new Error("logout error: " + error.message);
    }

    response.status(200).clearCookie("authToken").send("Successfully logged out");
  });
};

export const register = async (request: Request, response: Response) => {
  const { name, email, password, confirmPassword } = request.body;

  logger.info({
    path: "register",
    data: { name, email, password, confirmPassword },
  });

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Please enter all fields");
  }
  if (password !== confirmPassword) {
    throw new Error("Password confirmation not matching");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const results = await pool.query(`SELECT * FROM account.accounts WHERE email = $1`, [email]);

    if (results.rows.length > 0) {
      throw new Error("Email already registered");
    }

    pool.query(
      "INSERT INTO account.accounts (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
      (error, result) => {
        if (error) {
          throw new Error("error from reg db:" + error.message);
        }
        // should have safer type checking..
        const newUserId = result.rows[0].id;

        response.status(201).send(`User added with ID: ${newUserId ?? "unknown"}`);
      }
    );
  } catch (e) {
    if (isErrorWithMessage(e)) {
      return response.status(400).json({
        message: e.message,
      });
    }
    return response.status(400).json(e);
  }
};
