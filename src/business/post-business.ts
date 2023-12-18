import { PostDatabase } from "../database/post-database"
import { CreatePostInputDTO, CreatePostOutputDTO, GetAllPostInputDTO } from "../dtos"
import { Post, PostDB } from "../entity"
import { BadRequestError } from "../errors"
import { IdGenerator, TokenManager } from "../services"

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getAllPost = async (input: GetAllPostInputDTO) => {

        const payload = this.tokenManager.getPayload(input.token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postDb: PostDB[] = await this.postDatabase.getAllPosts(input.q)
        return postDb
    }

    public createPost = async (input: CreatePostInputDTO) => {
        const { content, rl_user, token } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const id = this.idGenerator.generate()

        const newPost = new Post(
            id,
            content,
            0,
            0,
            rl_user,
            new Date().toISOString(),
            null
        )

        const newPostDb = newPost.createDBModel()
        await this.postDatabase.createPost(newPostDb)

        const output: CreatePostOutputDTO = {
            id: newPostDb.id,
            message: 'Publicação compartilhada com sucesso!'
        }

        return output
    }
}