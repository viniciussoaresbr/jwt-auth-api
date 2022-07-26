import { Response } from "express";
import { IRequest } from "../interfaces";
import { userService } from "../services/user.service";
import { httpErrorsStatus } from "../utils/errors.status";

const save = async (req: IRequest, res: Response) => {
  try {
    await userService.save(req.body);
    res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      const statusCode =
        httpErrorsStatus[error.name as keyof typeof httpErrorsStatus];
      res.status(statusCode || 500).send({ message: error.message });
    }
  }
};

export const userController = { save };
