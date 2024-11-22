import { Request, Response } from "express";
import { pool } from "../../../dbPool";

export const create = (request: Request, response: Response) => {
  const { heading, content, todoitem, checked } = request.body;
  const userId = request.decodedAccountId;

  pool.query(
    "INSERT INTO notes (userId, heading, content, todoitem, checked) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, heading, content, todoitem, checked],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
