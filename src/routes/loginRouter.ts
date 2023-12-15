import express from 'express'
import { UserController } from '../controller';
import { UserDatabase } from '../database/user-database';
import { IdGenerator, TokenManager } from '../services';
import { UserBusiness } from '../business';

export const loginRouter = express.Router();
const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new TokenManager()
)
const userController = new UserController(
    userBusiness
);

loginRouter.post('/login', userController.loginUser)