import { NextFunction, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { IRequest, IUserRequest } from "../interfaces";

export const authToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new createError.Unauthorized("Token de acesso é obrigatório");
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) throw new createError.Forbidden("Token de acesso inválido");

  jwt.verify(
    token,
    process.env.ACESS_TOKEN_SECRET as jwt.Secret,
    (error, user) => {
      if (error) throw new createError.Forbidden("Token de acesso inválido");
      req.user = user as IUserRequest;
      next();
    }
  );
};
