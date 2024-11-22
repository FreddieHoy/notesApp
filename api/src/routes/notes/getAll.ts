import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";
import { INote } from "../types";

const PATH = "/notes";

export const getAll = async (request: Request, response: Response) => {
  const userId = request.decodedAccountId;

  logger.info({
    path: PATH,
    message: "Get all notes for user",
  });

  try {
    const results = await pool.query(
      "SELECT * FROM note.notes WHERE account_id = $1 ORDER BY id ASC",
      [userId]
    );

    const notes = results.rows as INote[];

    logger.info({
      path: PATH,
      message: "Success getting all notes for user",
    });

    return response.status(200).json(notes);
  } catch (error) {
    logger.error({
      path: PATH,
      error,
    });
    throw error;
  }
};
