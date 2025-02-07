import { Request, Response } from "express";
import { pool } from "../../../../dbPool";
import logger from "../../../logger";
import snakeToCamel from "../../utils/snakeToCamel";

const PATH = "/account/notes/get";

const GET_ALL_NOTES_FOR_USER = `
  SELECT * FROM note.notes 
  WHERE account_id = $1 
  AND deleted_on IS NULL 
  ORDER BY id ASC
`;

export default async (request: Request, response: Response) => {
  const accountId = request.decodedAccountId;

  logger.info({
    path: PATH,
    params: {
      accountId,
    },
  });

  try {
    const result = await pool.query(GET_ALL_NOTES_FOR_USER, [accountId]);

    const notes = (result.rows || []).map((note) => snakeToCamel(note));

    logger.info({
      path: PATH,
      params: {
        accountId,
      },
    });

    return response.status(200).json(notes);
  } catch (error) {
    logger.error({
      path: PATH,
      error,
    });
    return response.status(400).end();
  }
};
