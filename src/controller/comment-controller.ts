import { Request, Response } from 'express'
import { PostBusiness } from '../business'
import { CreateCommentSchema, CreatePostSchema, EditCommentByIdSchema } from '../dtos'
import { CommentBusiness } from '../business/comment-business'
import { ZodError } from 'zod'
import { BaseError } from '../errors'

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }

    public getCommentByPostCommentId = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.params.id as string,
                token: req.headers.authorization as string
            }

            const output = await this.commentBusiness.getCommentByPostCommentId(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }

    public createComment = async (req: Request, res: Response) => {
        try {
            const input = CreateCommentSchema.parse({
                content: req.body.content as string,
                rl_user: req.body.rl_user,
                rl_post: req.body.rl_post,
                rl_comment: req.body.rl_comment,
                token: req.headers.authorization as string
            })

            const output = await this.commentBusiness.createComment(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = EditCommentByIdSchema.parse({
                id: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.commentBusiness.editCommentById(input)

            res.status(201).send(output)
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
