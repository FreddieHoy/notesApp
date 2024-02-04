import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool, secret } from "../../dbPool";
import db from "../db";

export const getMe = (request: Request, response: Response) => {
  const token = request.cookies.authToken;

  pool.query("SELECT * FROM account.accounts WHERE token = $1", [token], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const logIn = async (request: Request, response: Response) => {
  const { email, password } = request.body as { email: string; password: string };

  try {
    const account = await db.account.getByEmail(email);
    const { password: hashedPassword } = account;

    bcrypt.compare(password, hashedPassword, function (err, result) {
      if (err) {
        response.status(500).json({
          message: "Error from bycrpt compare: " + err.message,
        });
        response.end();
        return;
      }

      if (!result) {
        response.status(500).json({
          message: "Incorrect password",
        });
        response.end();
        return;
      } else {
        const token = jwt.sign({ sub: account.id }, secret, {
          expiresIn: "6h",
        });

        response.cookie("authToken", token, { httpOnly: true });

        response.json({
          message: `Welcome back ${account.name}! (With Cookie)`,
          account,
        });

        pool.query("UPDATE account SET token = $1 WHERE email = $2", [token, email], (error) => {
          if (error) {
            response.status(500).json({
              message: "error from db query:  " + error.message,
            });
            response.end();
            return;
          }
        });
      }
    });
  } catch (e) {
    throw e;
  }
};

export const logOut = (request: Request, response: Response) => {
  const userId = request.body.userId;

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

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Please enter all fields");
  }
  if (password !== confirmPassword) {
    throw new Error("Password confirmation not matching");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(`SELECT * FROM account.accounts WHERE email = $1`, [email], (err, results) => {
    if (err) {
      throw new Error("error trying to register: " + err.message);
    }
    if (results.rows.length > 0) {
      throw new Error("Email already registered");
    } else {
      pool.query(
        "INSERT INTO account (name, email, password) VALUES ($1, $2, $3) RETURNING *",
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
    }
  });
};
