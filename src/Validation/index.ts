import { z } from "zod";

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password Should be Minimum 6 characters" }),
});

export const RegisterValidation = z.object({
  name: z.string().min(5, "Name is Required"),
  email: z.string().email(),
  isSeller: z.boolean(),
  password: z
    .string()
    .min(6, { message: "Password Should be Minimum 6 characters" }),
});
