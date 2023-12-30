import { TRegisterUser } from "@/Interfaces";
import { apiClient } from "./api";

export const RegisterUser = async (payload: TRegisterUser) => {
  return apiClient.post("/users/register", payload);
};
export const loginUser = async (cred: Partial<TRegisterUser>) => {
  return apiClient.post("/users/login", cred);
};
