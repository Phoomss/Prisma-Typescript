import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import prisma from "../configs/dbConfig";

const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCode.UNAUTHORIZED_EXCEPTION
      )
    );
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      next(
        new UnauthorizedException(
          "Unauthorized",
          ErrorCode.UNAUTHORIZED_EXCEPTION
        )
      );
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCode.UNAUTHORIZED_EXCEPTION
      )
    );
  }
};

export default authMiddleware;
