import { pool } from "../../../dbPool";
import { IAccount } from "../../routes/types";

const get = async ({ id }: { id: string }): Promise<IAccount> => {
  try {
    const results = await pool.query("SELECT * FROM account.accounts WHERE id = $1", [id]);

    const account = results.rows[0];

    if (!account) {
      throw new Error("Account not found");
    }

    return account as IAccount;
  } catch (e) {
    throw new Error("Failed to find Account");
  }
};

export default get;
