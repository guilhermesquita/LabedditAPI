import { Request, Response } from 'express'
import { UserBusiness } from '../business'
import { BaseError } from '../errors'
import { CreateUserSchema } from '../dtos'
import { ZodError } from 'zod'

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public getUserById = async (req: Request, res: Response) => {
        try {
            const id = { id: req.params.id as string }
            const output = await this.userBusiness.getUserById(id)

            res.status(200).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send('unexpected error')
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = CreateUserSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            const output = await this.userBusiness.createUser(input)

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
