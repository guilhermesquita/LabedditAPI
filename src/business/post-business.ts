import { PostDatabase } from "../database/post-database"
import { UserDatabase } from "../database/user-database"
import { CreatePostInputDTO, CreatePostOutputDTO, EditPostByIdInputDTO, EditPostByIdOutputDTO, GetAllPostInputDTO } from "../dtos"
import { Post, PostDB, UserDB } from "../entity"
import { BadRequestError, NotFoundError } from "../errors"
import { IdGenerator, TokenDecode, TokenManager } from "../services"
import * as jwt from 'jsonwebtoken';

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private readonly userDatabase: UserDatabase
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

        const userDB: UserDB = await this.userDatabase.getUserById(rl_user)
        if (!userDB) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const decodedToken = jwt.decode(token) as TokenDecode;
        if(userDB.id !== decodedToken.id){
            throw new BadRequestError("Usuário não permitido")
        }
        
        const id = this.idGenerator.generate()

        const totalComment = await this.postDatabase.countComments(id)
        const totalLike = await this.postDatabase.countLikes(id)
        const totalDislike = await this.postDatabase.countDislikes(id)

        let comments
        if (totalComment) {
            comments = totalComment['count(*)'];
        }

        let likes
        if (totalLike) {
            likes = totalLike['count(*)'];
        }

        let dislikes
        if (totalDislike) {
            dislikes = totalDislike['count(*)'];
        }

        const newPost = new Post(
            id,
            content,
            comments as number,
            likes as number,
            dislikes as number,
            rl_user,
            new Date().toISOString()
        )

        const newPostDb = newPost.createDBModel()
        await this.postDatabase.createPost(newPostDb)

        const output: CreatePostOutputDTO = {
            id: newPostDb.id,
            message: 'Publicação compartilhada com sucesso!'
        }

        return output
    }
    
    public editPostById = async (input: EditPostByIdInputDTO) => {
        const { id, token, content } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postDb: PostDB = await this.postDatabase.getAllPosts(id)
        if (!postDb) {
            throw new NotFoundError('Postagem não encontrado')
        }

        const decodedToken = jwt.decode(token) as TokenDecode;
        if(postDb.rl_user !== decodedToken.id){
            throw new BadRequestError("Usuário não permitido")
        }

        const totalComment = await this.postDatabase.countComments(id)
        const totalLike = await this.postDatabase.countLikes(id)
        const totalDislike = await this.postDatabase.countDislikes(id)

        let comments
        if (totalComment) {
            comments = totalComment['count(*)'];
        }

        let likes
        if (totalLike) {
            likes = totalLike['count(*)'];
        }

        let dislikes
        if (totalDislike) {
            dislikes = totalDislike['count(*)'];
        }

        const updatePost = new Post(
            postDb.id,
            content,
            comments as number,
            likes as number,
            dislikes as number,
            postDb.rl_user,
            postDb.created_at,
            new Date().toISOString()
        )

        const postDBModel = updatePost.editDBModel(input)
        await this.postDatabase.editPostById(postDBModel)


        const output: EditPostByIdOutputDTO = {
            id: postDb.id,
            message: `A sua postagem foi editada com sucesso`,
        }
        return output
    }
}