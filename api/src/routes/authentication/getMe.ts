import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";

const PATH = "auth/me";

export default async (request: Request, response: Response) => {
  const accountId = request.decodedAccountId;

  logger.info({
    path: "/me",
  });

  try {
    const res = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [accountId]);

    if (!res.rows.length) throw new Error("No account found with this token");

    const account = res.rows[0];

    return response.status(200).json(account);
  } catch (e) {
    logger.error({
      path: PATH,
      error: e,
    });

    return response.status(401).json({ hi: "there" });
  }
};
