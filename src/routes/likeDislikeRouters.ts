import { LikeDislikeBusiness } from "../business";
import { LikeDislikeController } from "../controller/like-dislike-controller";
import { LikeDislikePostDatabase } from "../database/like-dislike-post-database";
import { PostDatabase } from "../database/post-database";
import { UserDatabase } from "../database/user-database";
import { IdGenerator, TokenManager } from "../services";
import express from 'express'

export const likeDislikeRouter = express.Router();

//Injenção de dependecias
const likeDislikeBusiness = new LikeDislikeBusiness(
    new IdGenerator(),
    new TokenManager(),
    new LikeDislikePostDatabase(),
    new PostDatabase(),
    new UserDatabase()
)
const likeDislikeController = new LikeDislikeController(
    likeDislikeBusiness
);


likeDislikeRouter.post('/like/posts', likeDislikeController.CreateLikePost)
likeDislikeRouter.post('/dislike/posts', likeDislikeController.CreateDislikePost)