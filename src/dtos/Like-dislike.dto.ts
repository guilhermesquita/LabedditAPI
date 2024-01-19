import { z } from "zod"

export interface CreateLikeDislikePostInputDTO{
    rl_user: string
    rl_post: string 
    token: string
}

export interface CreateLikeDislikePostOutputDTO{
    id_post: string 
    message: string
}

export const createLikeDislikePostSchema = z.object({
    rl_user: z.string().min(1),
    rl_post: z.string().min(1),
    token: z.string().min(1)
})