import { Request } from "express";

export interface IPost {
  text: string;
  author: IUser;
  authorId: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  name: string;
  lastName: string;
  posts?: IPost[];
}

export interface IUserRequest {
  userId: number;
}

export interface IRequest extends Request {
  user?: IUserRequest;
}
