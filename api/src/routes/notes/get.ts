import { Request, Response } from "express";
import { pool } from "../../../dbPool";

export const get = async (request: Request, response: Response) => {
  const { id } = request.params;
  const userId = request.decodedAccountId;

  try {
    const result = await pool.query(
      "SELECT * FROM note.notes WHERE userId = $1, id = $2 ORDER BY id ASC",
      [userId, id]
    );

    const note = result.rows[0];

    return response.status(200).json(note);
  } catch (error) {
    throw error;
  }
};
