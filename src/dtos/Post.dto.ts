import { z } from "zod"

//CREATE
export interface CreatePostInputDTO{
    content: string
    rl_user: string
    token: string 
}

export interface CreatePostOutputDTO{
    id: string, 
    message: string
}

export const CreatePostSchema = z.object({
    content: z.string().min(1).max(500),
    rl_user: z.string().min(2),
    token: z.string().min(2)
})

//GET POST
export interface GetAllPostInputDTO {
    q: string | undefined;
    token: string;
}

//EDIT
export interface EditPostByIdInputDTO {
    id: string,
    content: string,
    token: string,
    edited_at?: string
}

export interface EditPostByIdOutputDTO {
    id: string;
    message: string;
}

export const EditPostByIdSchema = z.object({
    id: z.string().min(1),
    content: z.string().min(2).optional(),
    token: z.string().min(1)
  }).transform(data => data as EditPostByIdInputDTO)