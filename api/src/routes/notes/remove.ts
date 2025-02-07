import { Request, Response } from "express";
import { pool } from "../../../dbPool";

export const remove = async (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    await pool.query(`UPDATE note.notes SET deleted_on = NOW() WHERE id = $1`, [id]);

    return response.status(200);
  } catch (error) {
    return response.status(400);
  }
};
