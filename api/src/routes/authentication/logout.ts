import { Request, Response } from "express";
import logger from "../../logger";

export default (request: Request, response: Response) => {
  const accountId = request.decodedAccountId;

  logger.info({
    path: "logOut",
    data: { accountId },
  });

  return response.status(200).clearCookie("authToken").send();
};
