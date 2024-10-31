import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"; 
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root"; 
import { JWT_SECRET } from "../secrets"; 
import prisma from "../configs/dbConfig"; 

// Middleware function for authentication
const authMiddleware = async (
  req: any, // Request object, can be typed more specifically
  res: Response, // Response object
  next: NextFunction // Next function to pass control to the next middleware
) => {
  // Extracting token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Check if token is present
  if (!token) {
    // If no token, call next() with UnauthorizedException
    next(
      new UnauthorizedException(
        "Unauthorized", // Error message
        ErrorCode.UNAUTHORIZED_EXCEPTION // Error code
      )
    );
    return; // Exit the function
  }

  try {
    // Verifying the JWT and extracting payload
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    
    // Fetching the user from the database based on userId in the token payload
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    
    // Check if the user exists
    if (!user) {
      // If user does not exist, call next() with UnauthorizedException
      next(
        new UnauthorizedException(
          "Unauthorized",
          ErrorCode.UNAUTHORIZED_EXCEPTION
        )
      );
      return; // Exit the function
    }

    // If user exists, attach the user object to the request
    req.user = user;

    // Call next() to pass control to the next middleware
    next();
  } catch (error) {
    // Catch any errors during token verification or user fetching
    next(
      new UnauthorizedException(
        "Unauthorized",
        ErrorCode.UNAUTHORIZED_EXCEPTION
      )
    );
  }
};

export default authMiddleware;
