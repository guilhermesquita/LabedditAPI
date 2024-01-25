import { LikeDislikePostDatabase } from "../database/like-dislike-post-database";
import { PostDatabase } from "../database/post-database";
import { UserDatabase } from "../database/user-database";
import { CreateLikeDislikePostInputDTO, CreateLikeDislikePostOutputDTO } from "../dtos";
import { PostDB, UserDB } from "../entity";
import { BadRequestError, NotFoundError } from "../errors";
import { IdGenerator, TokenDecode, TokenManager } from "../services";
import * as jwt from 'jsonwebtoken';

export class LikeDislikeBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private likeDislikePost: LikeDislikePostDatabase,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase
    ) { }

    public createLikePost = async (input: CreateLikeDislikePostInputDTO) => {
        const { rl_post, rl_user, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const decodedToken = jwt.decode(token) as TokenDecode;
        if (rl_user === decodedToken.id) {
            throw new BadRequestError("Ação não permitida ao usuário. Você não pode curtir o próprio post")
        }

        const postDb: PostDB = await this.postDatabase.getAllPosts(rl_post)
        if (!postDb) {
            throw new NotFoundError('Postagem não encontrado')
        }

        const userDB: UserDB = await this.userDatabase.getUserById(rl_user)
        if (!userDB) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const postDatabase = await this.postDatabase.getPostsByUserAndId(rl_post, rl_user)
        if(!postDatabase){
            throw new NotFoundError('Postagem não encontrada')
        }
        await this.postDatabase.editLikesPostById(postDb.like, rl_post)

        const id = this.idGenerator.generate()

        const inputLike = {
            id,
            rl_user,
            rl_post,
            like: 1
        }
        await this.likeDislikePost.createLikeDislike(inputLike)
        
        const output: CreateLikeDislikePostOutputDTO = {
            id_post: rl_post,
            message: `A postagem curtida com sucesso`,
        }
        return output
    }

    public createDislikePost = async (input: CreateLikeDislikePostInputDTO) => {
        const { rl_post, rl_user, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const decodedToken = jwt.decode(token) as TokenDecode;
        if (rl_user === decodedToken.id) {
            throw new BadRequestError("Ação não permitida ao usuário. Você não pode curtir o próprio post")
        }

        const postDb: PostDB = await this.postDatabase.getAllPosts(rl_post)
        if (!postDb) {
            throw new NotFoundError('Postagem não encontrado')
        }

        const userDB: UserDB = await this.userDatabase.getUserById(rl_user)
        if (!userDB) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const postDatabase = await this.postDatabase.getPostsByUserAndId(rl_post, rl_user)
        if(!postDatabase){
            throw new NotFoundError('Postagem não encontrada')
        }
        await this.postDatabase.editDislikesPostById(postDb.like, rl_post)

        const id = this.idGenerator.generate()

        const inputLike = {
            id,
            rl_user,
            rl_post,
            like: 0
        }
        await this.likeDislikePost.createLikeDislike(inputLike)
        
        const output: CreateLikeDislikePostOutputDTO = {
            id_post: rl_post,
            message: `A dislike efetuado com sucesso`,
        }
        return output
    }
}