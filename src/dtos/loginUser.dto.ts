import { z } from "zod";

export interface LoginUserInputDTO {
    email: string;
    password: string;
}

export interface LoginUserOutputDTO {
    message: string;
    token: string;
}

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
  }).transform(data => data as LoginUserInputDTO)