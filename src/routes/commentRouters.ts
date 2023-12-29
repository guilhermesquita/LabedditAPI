import express from 'express'
import { CommentController, PostController } from '../controller';
import { CommentBusiness} from '../business';
import { PostDatabase } from '../database/post-database';
import { IdGenerator, TokenManager } from '../services';
import { CommentDatabase } from '../database/comment-database';

export const commentRouter = express.Router();

//Injenção de dependecias
const commentBusiness = new CommentBusiness(
    new CommentDatabase(),
    new IdGenerator(),
    new TokenManager()
)
const commentController = new CommentController(
    commentBusiness
);

//Implementação das rotas
// commentRouter.get('/', commentController.getAllPost)
commentRouter.post('/', commentController.createComment)