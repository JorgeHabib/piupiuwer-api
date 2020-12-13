import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../config/auth";
import AppError from "../errors/AppError";

interface ITokenPayload {
  sub: string;
  exp: number;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    }

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
