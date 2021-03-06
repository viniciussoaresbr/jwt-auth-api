import { prisma } from "../../prisma/prisma";
import { IPost, IUserRequest } from "../interfaces";

const save = async (postBody: IPost, user: IUserRequest) => {
  const post = await prisma.post.create({
    data: {
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

export const postService = { save };
