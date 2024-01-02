import { z } from "zod";

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