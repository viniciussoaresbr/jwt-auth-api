import { Response } from "express";
import { IRequest } from "../interfaces";
import { authService } from "../services/auth.service";
import { httpErrorsStatus } from "../utils/errors.status";

const auth = async (req: IRequest, res: Response) => {
  try {
    const data = await authService.auth(req.body);
    res.send(data);
  } catch (error) {
    if (error instanceof Error) {
      const statusCode =
        httpErrorsStatus[error.name as keyof typeof httpErrorsStatus];
      res.status(statusCode || 500).send({ message: error.message });
    }
  }
};

export const authController = { auth };
