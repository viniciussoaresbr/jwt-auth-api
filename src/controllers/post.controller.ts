import { Response } from "express";
import { IRequest, IUserRequest } from "../interfaces";
import { postService } from "../services/post.service";
import { httpErrorsStatus } from "../utils/errors.status";

const save = async (req: IRequest, res: Response) => {
  try {
    await postService.save(req.body, req.user as IUserRequest);
    res.status(201).send({ message: "Post criado com sucesso" });
  } catch (error) {
    res
      .status(httpErrorsStatus.BadRequestError)
      .send({ message: "Data inválida" });
  }
};

export const postController = { save };
