import { Request, Response } from "express";
import { pool } from "../../../dbPool";

export const remove = (request: Request, response: Response) => {
  const id = request.params.id;

  try {
    pool.query(`DELETE FROM note.notes WHERE id = $1`, [id]);

    response.status(200);
  } catch (error) {
    return response.status(400);
  }
};
