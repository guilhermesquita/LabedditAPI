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

export interface CreateLikeDislikeCommentInputDTO{
    rl_user: string
    rl_comment: string 
    token: string
}

export interface CreateLikeDislikeCommentOutputDTO{
    id_post: string 
    message: string
}

export interface listLikeDislikeCommentsByRlPostAndRlUserInputDTO{
    id_post: string 
    id_user: string
    token: string
}

export interface listLikeDislikeCommentsByRlCommentAndRlUserInputDTO{
    id_comment: string 
    id_user: string
    token: string
}

export const createLikeDislikeCommentSchema = z.object({
    rl_user: z.string().min(1),
    rl_comment: z.string().min(1),
    token: z.string().min(1)
})