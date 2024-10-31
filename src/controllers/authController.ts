import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../configs/dbConfig";
import { comparePassword, hashPassword } from "../helpers/authHelper";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validateion";
import { signupShema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  signupShema.parse(req.body);
  const { email, password, name } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    new BadRequestsException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  res.status(201).json({
    message: "User registered successfully!",
    data: newUser,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  const userWithIdentifier = await prisma.user.findFirst({
    where: { email },
  });

  if (!userWithIdentifier) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const matchPassword = await comparePassword(
    password,
    userWithIdentifier.password
  );

  if (!matchPassword) {
    return next(
      new BadRequestsException("Invalid password", ErrorCode.INCORRECT_PASSWORD)
    );
  }

  const jwtToken = jwt.sign(
    {
      id: userWithIdentifier.id,
      email: userWithIdentifier.email,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "login success",
    data: {
      email: userWithIdentifier.email,
      name: userWithIdentifier.name,
      token: jwtToken,
    },
  });
};
