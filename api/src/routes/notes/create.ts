import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";
import { INoteCreate } from "../types";

const PATH = "/notes/create";

const CREATE_NOTE_QUERY = `
  INSERT INTO note.notes (account_id, heading, content)
  VALUES ($1, $2, $3) 
  RETURNING *
`;

export const create = async (request: Request, response: Response) => {
  const { heading, content } = request.body as INoteCreate;
  const accountId = request.decodedAccountId;

  try {
    const res = await pool.query(CREATE_NOTE_QUERY, [accountId, heading, content]);
    const note = res.rows[0];

    if (!note) throw new Error("Failed to create note");

    logger.info({
      path: PATH,
      accountId,
    });

    return response.status(200).json(note);
  } catch (error) {
    logger.error({
      path: PATH,
      error,
    });
    throw error;
  }
};
