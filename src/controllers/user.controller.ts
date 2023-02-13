import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { httpErrorsStatus } from "../utils/errors.status";

const save = async (req: Request, res: Response) => {
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

const findUserById = async (req: Request, res: Response) => {
  try {
    const data = await userService.findUserById(parseInt(req.params.userId));
    res.status(200).send(data);
  } catch (error) {
    res
      .status(httpErrorsStatus.BadRequestError)
      .send({ message: "Usuário não encontrado" });
  }
};

export const userController = { save, findUserById };
