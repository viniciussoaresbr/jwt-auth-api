import { Response } from "express";
import { IRequest } from "../interfaces";
import { userService } from "../services/user.service";
import { httpErrorsStatus } from "../utils/errors.status";

const save = async (req: IRequest, res: Response) => {
  try {
    await userService.save(req.body);
    res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res
      .status(httpErrorsStatus.BadRequestError)
      .send({ message: "Data inválida" });
  }
};

export const userController = { save };
