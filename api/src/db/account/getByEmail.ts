import { pool } from "../../../dbPool";
import { IAccount } from "../../routes/types";

const getByEmail = async (email: string): Promise<IAccount> => {
  try {
    const results = await pool.query("SELECT * FROM account.accounts WHERE email = $1", [email]);

    const account = results.rows[0];

    if (!account) {
      throw new Error("Account not found");
    }

    return account as IAccount;
  } catch (e) {
    throw new Error("Failed to find Account");
  }
};

export default getByEmail;
