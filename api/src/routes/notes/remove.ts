import { Request, Response } from "express";
import { pool } from "../../../dbPool";
import logger from "../../logger";

const PATH = "/notes/remove";

const NOTE_DELETE_QUERY = `
  UPDATE note.notes 
  SET deleted_on = NOW() 
  WHERE id = $1 AND account_id = $2
`;

export const remove = async (request: Request, response: Response) => {
  const id = request.params.id;
  const accountId = request.decodedAccountId;

  logger.info({
    path: PATH,
    msg: "Remove Note Start",
    accountId,
  });

  try {
    await pool.query(NOTE_DELETE_QUERY, [id, accountId]);

    logger.info({
      path: PATH,
      msg: "Remove Note Success",
      accountId,
    });

    return response.status(200).end();
  } catch (error) {
    logger.error({
      path: PATH,
      msg: "Remove Note Error",
      accountId,
    });

    return response.status(400).end();
  }
};
