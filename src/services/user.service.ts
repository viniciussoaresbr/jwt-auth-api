import { prisma } from "../database/prisma";
import { IUser } from "../interfaces";
import createError from "http-errors";
import bcrypt from "bcryptjs";

const save = async (userBody: IUser) => {
  const { email, password } = userBody;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) throw new createError.Conflict("E-mail já foi cadastrado");

  const userPassword = bcrypt.hashSync(password, 8);

  const user = await prisma.user.create({
    data: { ...userBody, password: userPassword },
  });

  return user;
};

export const userService = { save };
