import { Request, Response } from 'express'
import { PostBusiness } from '../business'

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) {}

    public getAllPost = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
    
            const output = await this.postBusiness.getAllPost(q)
            
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
