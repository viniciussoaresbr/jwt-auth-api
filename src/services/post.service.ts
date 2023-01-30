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

export const postService = { save, findAll, findByUserId };
