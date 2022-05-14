import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// augment the type globally to all files
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// augment the type locally to this file
// declare module "express" {
//   interface Request {
//     currentUser?: UserPayload;
//   }
// }

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
