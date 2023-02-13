import createHttpError from "http-errors";
import { prisma } from "../database/prisma";
import { IPost, IUserRequest } from "../interfaces";

const save = async (postBody: IPost, user: IUserRequest) => {
  const post = await prisma.post.create({
    data: {
      username: user?.username,
      text: postBody.text,
      author: {
        connect: {
          id: user?.userId,
        },
      },
    },
  });

  return post;
};

const findAll = () => {
  return prisma.post.findMany();
};

const findByUserId = (id: number) => {
  return prisma.post.findMany({
    where: {
      author: {
        id: id,
      },
    },
  });
};

const deletePostById = async (id: number, user: IUserRequest) => {
  const userPosts = await findByUserId(user.userId);

  const postExists = userPosts.some(post => post.id === id);

  if (!postExists) {
    throw new createHttpError.BadRequest("Esse post não existe");
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  return deletedPost;
};

export const postService = { save, findAll, findByUserId, deletePostById };
