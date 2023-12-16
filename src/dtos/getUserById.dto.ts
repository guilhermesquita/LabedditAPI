import { z } from "zod";

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