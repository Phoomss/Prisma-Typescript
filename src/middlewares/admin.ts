import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";

const adminMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const user = req.user as User | undefined;
    if (user && user.role === "ADMIN") {
        next();
    } else {
        next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED_EXCEPTION));
    }
};

export default adminMiddleware;
