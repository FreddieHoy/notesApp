import { JwtPayload } from "jsonwebtoken";

interface ErrorWithMessage {
  message: string;
}

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof (error as Record<string, unknown>).message === "string";

export const isJWTPayload = (payload: string | JwtPayload): payload is JwtPayload => {
  return typeof payload === "object";
};
