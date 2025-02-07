import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";

const PATH = "/notes/get";

const GET_ALL_NOTES_FOR_USER = `
  SELECT * FROM note.notes 
  WHERE account_id = $1 AND id = $2 AND deleted_on IS NULL
  ORDER BY id ASC;
`;

export const get = async (request: Request, response: Response) => {
  const { id } = request.params;
  const accountId = request.decodedAccountId;

  logger.info({
    path: PATH,
    accountId,
  });

  try {
    const result = await pool.query(GET_ALL_NOTES_FOR_USER, [accountId, id]);

    const note = result.rows[0];

    return response.status(200).json(note);
  } catch (error) {
    logger.error({
      path: PATH,
      error,
    });
    return response.status(400);
  }
};
