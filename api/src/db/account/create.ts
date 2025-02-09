import { pool } from "../../../dbPool";
import logger from "../../logger";
import { IAccount } from "../../routes/types";

const PATH = "db/account/create";

const CREATE_ACCOUNT_QUERY = `
  INSERT INTO account.accounts (name, email, password) 
  VALUES ($1, $2, $3) 
  RETURNING *;
`;

const create = async ({
  email,
  hashedPassword,
  name,
}: {
  email: string;
  name: string;
  hashedPassword: string;
}): Promise<IAccount> => {
  logger.info({
    msg: "Create Account Start",
    path: PATH,
    data: { email },
  });

  try {
    const results = await pool.query(CREATE_ACCOUNT_QUERY, [name, email, hashedPassword]);

    const account = results.rows[0];

    if (!account) throw new Error("Account not found");

    logger.info({
      msg: "Create Success",
      path: PATH,
      data: { email },
    });

    return account as IAccount;
  } catch (e) {
    logger.error({
      msg: "Create Failed",
      path: PATH,
      data: { email },
    });
    throw new Error("Failed to find Account");
  }
};

export default create;
