import { z } from "zod"

//CREATE
export interface CreateCommentInputDTO {
    content: string
    rl_user: string
    rl_post?: string
    rl_comment?: string
    token: string
}

export interface CreateCommentOutputDTO {
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

//GET COMMENTS
export interface GetCommentByPostIdInputDTO {
    id: string;
    token: string;
}

export interface GetCommentByPostIdOutputDTO {
    id: string;
    content: string;
    email: string;
    comments: number;
    like: number;
    dislikes: number;
    rl_user: string;
    rl_post: string;
    rl_comment: string
}

export const GetCommentByPostIdSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as GetCommentByPostIdInputDTO)

// export interface EditCommentByIdInputDTO {
//     id: string,
//     content: string,
//     like: boolean,
//     dislike: boolean,
//     token: string,
//     edited_at?: string
// }

// export interface EditCommentByIdOutputDTO {
//     id: string;
//     message: string;
// }

// export const EditPostByIdSchema = z.object({
//     id: z.string().min(1),
//     content: z.string().min(2).optional(),
//     like: z.boolean().optional(),
//     dislike: z.boolean().optional(),
//     comments: z.boolean().optional(),
//     token: z.string().min(1)
// }).transform(data => data as EditCommentByIdInputDTO)