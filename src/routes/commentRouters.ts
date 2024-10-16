import express from 'express'
import { CommentController } from '../controller';
import { CommentBusiness} from '../business';
import { IdGenerator, TokenManager } from '../services';
import { CommentDatabase } from '../database/comment-database';

export const commentRouter = express.Router();

//Injenção de dependências
const commentBusiness = new CommentBusiness(
    new CommentDatabase(),
    new IdGenerator(),
    new TokenManager()
)
const commentController = new CommentController(
    commentBusiness
);

//Implementação das rotas
commentRouter.get('/:id_post', commentController.getCommentByPostCommentId)
commentRouter.get('/', commentController.getAllComments)
commentRouter.post('/', commentController.createComment)
commentRouter.put('/:id', commentController.editPost)