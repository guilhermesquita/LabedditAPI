import { z } from "zod";

//CREATE
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

//LOGIN
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

//GETUSER
export interface GetUserByIdInputDTO {
    id: string;
    token: string;
}

export interface GetUserByIdOutputDTO {
    id: string;
    name: string;
    email: string;
}

export const GetUserByIdSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1)
  }).transform(data => data as GetUserByIdInputDTO)

export interface EditUserByIdInputDTO {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    token: string;
}

export interface EditUserByIdOutputDTO {
    id: string;
    name: string;
    email: string;
}

export const EditUserByIdSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(4).optional()
  }).transform(data => data as EditUserByIdInputDTO)