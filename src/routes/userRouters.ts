import express from 'express'
import { UserController } from '../controller';
import { UserBusiness } from '../business';
import { UserDatabase } from '../database/user-database';

export const userRouter = express.Router();

//Injenção de dependecias
const userBusiness = new UserBusiness(
    new UserDatabase()
)
const userController = new UserController(
    userBusiness
);

//Implementação das rotas
userRouter.get('/:id', userController.getUserById)
