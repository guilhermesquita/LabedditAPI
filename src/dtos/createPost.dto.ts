import { z } from "zod"

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