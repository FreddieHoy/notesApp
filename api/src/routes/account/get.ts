import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";

const PATH = "account/get";

export default async (request: Request, response: Response) => {
  const { accountId } = request.params;

  logger.info({
    path: PATH,
    accountId,
  });

  try {
    const res = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [accountId]);

    if (res.rows.length !== 1) throw new Error("Account not found");

    const account = res.rows[0];

    return response.status(200).json(account);
  } catch (error) {
    logger.error({
      msg: "Failed getting account",
      path: PATH,
      accountId,
    });
  }
};
