import { LikeDislikePostDatabase } from "../database/like-dislike-post-database";
import { CreateLikeDislikePostInputDTO, CreateLikeDislikePostOutputDTO } from "../dtos";
import { BadRequestError } from "../errors";
import { IdGenerator, TokenDecode, TokenManager } from "../services";
import * as jwt from 'jsonwebtoken';

export class LikeDislikeBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private likeDislikePost: LikeDislikePostDatabase
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
}