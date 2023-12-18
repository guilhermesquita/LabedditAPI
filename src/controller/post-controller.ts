import { Request, Response } from 'express'
import { PostBusiness } from '../business'
import { CreatePostSchema } from '../dtos'

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
} 
