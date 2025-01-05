import { Request, Response } from "express";
import { pool } from "../../../dbPool";

const UPDATE_NOTES_QUERY = `
  UPDATE note.notes SET  
    heading = $1,
    content = $2
  WHERE id = $3 
  RETURNING *
`;

export const update = async (request: Request, response: Response) => {
  const { heading, content } = request.body;
  const id = request.params.id;

  try {
    const res = await pool.query(UPDATE_NOTES_QUERY, [heading, content, id]);

    if (res.rows.length !== 1) throw new Error("Note not found");

    const note = res.rows[0];

    return response.status(200).json(note);
  } catch (error) {
    console.error(error);
  }
};
