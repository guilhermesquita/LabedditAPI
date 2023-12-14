import { Request, Response } from 'express'
import { UserBusiness } from '../business'

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}

    public getUserById = async (req: Request, res: Response) => {
        try {
            const id = {id: req.params.id as string} 
            const output = await this.userBusiness.getUserById(id)
            
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
