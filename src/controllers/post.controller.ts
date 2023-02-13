import { Request, Response } from "express";
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

const findAll = async (req: Request, res: Response) => {
  try {
    const data = await postService.findAll();
    res.status(200).send(data);
  } catch (error) {
    res
      .status(httpErrorsStatus.BadRequestError)
      .send({ message: "Não foi possível exibir os posts" });
  }
};

const findByUserId = async (req: Request, res: Response) => {
  try {
    const data = await postService.findByUserId(parseInt(req.params.userId));
    res.status(200).send(data);
  } catch (error) {
    res
      .status(httpErrorsStatus.BadRequestError)
      .send({ message: "Não foi possível exibir os posts" });
  }
};

const deletePostById = async (req: IRequest, res: Response) => {
  try {
    await postService.deletePostById(
      parseInt(req.params.id),
      req.user as IUserRequest
    );
    res.status(201).send({ message: "Post deletado" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.name, error.stack);
      const statusCode =
        httpErrorsStatus[error.name as keyof typeof httpErrorsStatus];
      res.status(statusCode || 500).send({ message: error.message });
    }
  }
};

export const postController = { save, findAll, findByUserId, deletePostById };
