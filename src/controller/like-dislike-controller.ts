import { Request, Response } from 'express'
import { createLikeDislikeCommentSchema, createLikeDislikePostSchema } from '../dtos'
import { LikeDislikeBusiness } from '../business'
import { ZodError } from 'zod'
import { BaseError } from '../errors'

export class LikeDislikeController {
    constructor(
        private readonly likeDislikeBusiness: LikeDislikeBusiness
    ){}
    public CreateLikePost = async (req: Request, res: Response) => {
        try {
            const input = createLikeDislikePostSchema.parse({
                rl_user: req.body.rl_user,
                rl_post: req.body.rl_post,
                token: req.headers.authorization,
            })
            const result = await this.likeDislikeBusiness.createLikePost(input)
            res.status(201).send(result)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public CreateDislikePost = async (req: Request, res: Response) => {
        try {
            const input = createLikeDislikePostSchema.parse({
                rl_user: req.body.rl_user,
                rl_post: req.body.rl_post,
                token: req.headers.authorization,
            })
            const result = await this.likeDislikeBusiness.createDislikePost(input)
            res.status(201).send(result)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public CreateLikeComment = async (req: Request, res: Response) => {
        try {
            const input = createLikeDislikeCommentSchema.parse({
                rl_user: req.body.rl_user,
                rl_comment: req.body.rl_comment,
                token: req.headers.authorization,
            })
            const result = await this.likeDislikeBusiness.createLikeComment(input)
            res.status(201).send(result)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}