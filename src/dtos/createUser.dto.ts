import { z } from "zod";

export interface CreateUserInputDTO {
    name: string;
    email: string;
    password: string
}

export interface CreateUserOutputDTO {
    message: string;
    id: string;
    token: string
}

export const CreateUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4)
})