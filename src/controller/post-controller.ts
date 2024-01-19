import { Request, Response } from 'express'
import { PostBusiness } from '../business'
import { CreatePostSchema, EditPostByIdSchema } from '../dtos'
import { ZodError } from 'zod'
import { BaseError } from '../errors'

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    public getAllPost = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q as string | undefined,
                token: req.headers.authorization as string
            }

            const output = await this.postBusiness.getAllPost(input)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }

    public createPost = async (req: Request, res: Response) => {
        try {
            const input = CreatePostSchema.parse({
                content: req.body.content as string,
                rl_user: req.body.rl_user,
                token: req.headers.authorization as string
            })

            const output = await this.postBusiness.createPost(input)

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
            const input = EditPostByIdSchema.parse({
                id: req.params.id,
                content: req.body.content,
                like: req.body.like,
                dislike: req.body.dislike,
                token: req.headers.authorization
            })

            const output = await this.postBusiness.editPostById(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)
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
