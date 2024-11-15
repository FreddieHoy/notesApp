import { Request, Response } from "express";
import { pool } from "../../dbPool";

export const getNotes = (request: Request, response: Response) => {
  const userId = request.decodedAccountId;

  pool.query(
    "SELECT * FROM note.notes WHERE userId = $1 ORDER BY id ASC",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const getNote = (request: Request, response: Response) => {
  const { id } = request.params;
  const userId = request.decodedAccountId;

  pool.query(
    "SELECT * FROM note.notes WHERE userId = $1, id = $2 ORDER BY id ASC",
    [userId, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// TODO Change to use token and not user id
// const token = request.cookies.authToken;
export const createNote = (request: Request, response: Response) => {
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

export const editNote = (request: Request, response: Response) => {
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

export const deleteNote = (request: Request, response: Response) => {
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
