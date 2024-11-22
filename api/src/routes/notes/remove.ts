import { Request, Response } from "express";
import { pool } from "../../../dbPool";

export const remove = (request: Request, response: Response) => {
  const id = request.params.id;
  pool.query(
    `DELETE FROM note.notes 
      WHERE id = $1
    `,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200);
      response.end();
    }
  );
};
