declare module "express-serve-static-core" {
  interface Request {
    decodedAccountId?: string;
  }
  interface Response {}
}

export {};
