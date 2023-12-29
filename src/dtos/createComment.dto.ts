import { z } from "zod"

export interface CreateCommentInputDTO{
    content: string
    rl_user: string
    rl_post?: string 
    rl_comment?: string 
    token: string 
}

export interface CreateCommentOutputDTO{
    id: string, 
    message: string
}

export const CreateCommentSchema = z.object({
    content: z.string().min(1).max(500),
    rl_user: z.string().min(2),
    rl_post: z.string().min(2).optional(),
    rl_comment: z.string().min(2).optional(),
    token: z.string().min(2)
})