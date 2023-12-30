import { Dispatch, SetStateAction } from "react";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImg: string;
  role: "admin" | "user";
  isDeleted: boolean;
};

export interface TContextValue {
  User: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
}

export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
};
export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
