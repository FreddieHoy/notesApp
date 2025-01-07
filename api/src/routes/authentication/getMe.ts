import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";

export default async (request: Request, response: Response) => {
  const accountId = request.decodedAccountId;

  logger.info({
    path: "/me",
  });

  const res = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [accountId]);

  if (!res.rows.length) throw new Error("No account found with this token");

  const account = res.rows[0];

  return response.status(200).json(account);
};
