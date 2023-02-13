import { prisma } from "../database/prisma";
import { IUser } from "../interfaces";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import { bodyValidation } from "../utils/bodyValidation";

const save = async (userBody: IUser) => {
  const { name, lastname, email, password } = userBody;

  const requiredKeys = ["name", "lastname", "email", "password"];

  bodyValidation<IUser>(requiredKeys, userBody);

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) throw new createError.Conflict("E-mail já foi cadastrado");

  const userPassword = bcrypt.hashSync(password, 8);

  const user = await prisma.user.create({
    data: {
      name: name,
      lastname: lastname,
      email: email,
      password: userPassword,
    },
  });
  return user;
};

const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

export const userService = { save, findUserById };
