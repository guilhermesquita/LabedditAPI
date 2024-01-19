import express from 'express'
import { PostController } from '../controller';
import { PostBusiness } from '../business';
import { PostDatabase } from '../database/post-database';
import { IdGenerator, TokenManager } from '../services';
import { LikeDislikePostDatabase } from '../database/like-dislike-post-database';

export const postRouter = express.Router();

//Injenção de dependecias
const postBusiness = new PostBusiness(
    new PostDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new LikeDislikePostDatabase()
)
const postController = new PostController(
    postBusiness
);

//Implementação das rotas
postRouter.get('/', postController.getAllPost)
postRouter.post('/', postController.createPost)
postRouter.put('/:id', postController.editPost)