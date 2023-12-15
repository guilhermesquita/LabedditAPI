import express from 'express'
import { UserController } from '../controller';
import { UserBusiness } from '../business';
import { UserDatabase } from '../database/user-database';
import { IdGenerator, TokenManager } from '../services';

export const userRouter = express.Router();

//Injenção de dependecias
const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager()
)
const userController = new UserController(
    userBusiness
);

//Implementação das rotas
userRouter.get('/:id', userController.getUserById)
userRouter.post('/', userController.createUser)
