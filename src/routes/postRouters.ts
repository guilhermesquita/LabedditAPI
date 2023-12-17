import express from 'express'
import { PostController } from '../controller';
import { PostBusiness } from '../business';
import { PostDatabase } from '../database/post-database';

export const postRouter = express.Router();

//Injenção de dependecias
const postBusiness = new PostBusiness(
    new PostDatabase(),
    // new IdGenerator(),
    // new TokenManager()
)
const postController = new PostController(
    postBusiness
);

//Implementação das rotas
postRouter.get('/', postController.getAllPost)
// postRouter.post('/', userController.createUser)