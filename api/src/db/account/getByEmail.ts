import { pool } from "../../../dbPool";
import logger from "../../logger";
import { IAccount } from "../../routes/types";

const PATH = "db/account/getByEmail";

const getByEmail = async (email: string): Promise<IAccount> => {
  logger.info({
    path: PATH,
    data: { email },
  });

  try {
    const results = await pool.query("SELECT * FROM account.accounts WHERE email = $1", [email]);

    const account = results.rows[0];

    if (!account) {
      throw new Error("Account not found");
    }

    logger.info({
      path: PATH,
      msg: "Successfully found Account",
      data: { email },
    });

    return account as IAccount;
  } catch (error) {
    logger.error({
      path: PATH,
      data: { email },
      error,
    });
    throw new Error("Failed to find Account");
  }
};

export default getByEmail;
