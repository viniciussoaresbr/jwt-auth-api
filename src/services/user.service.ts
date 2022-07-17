import { prisma } from "../../prisma/prisma";
import { IPost, IUser } from "../interfaces";
import bcrypt from "bcryptjs";

const save = async (userBody: IUser) => {
  const userPassword = bcrypt.hashSync(userBody.password, 8);

  const user = await prisma.user.create({
    data: { ...userBody, password: userPassword },
  });

  return user;
};

export const userService = { save };
