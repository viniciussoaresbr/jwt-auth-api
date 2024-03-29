import { prisma } from "../database/prisma";
import { IUser } from "../interfaces";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import { emailValidation, passwordValidation } from "../utils/user.validate";

const save = async (userBody: IUser) => {
  const { name, lastname, email, password } = userBody;

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) throw new createError.Conflict("E-mail já foi cadastrado");

  emailValidation(email);
  passwordValidation(password);

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
