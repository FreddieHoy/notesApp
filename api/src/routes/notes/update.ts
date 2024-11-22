import { Request, Response } from "express";
import { pool } from "../../../dbPool";

export const update = (request: Request, response: Response) => {
  const { heading, content, todoitem, checked } = request.body;
  const id = request.params.id;

  pool.query(
    `UPDATE notes SET  
      heading = $1,
      content = $2,
      todoitem = $3,
      checked = $4
      WHERE id = $5 
      RETURNING *
    `,
    [heading, content, todoitem, checked, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};
