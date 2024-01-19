import { LikeDislikePostDatabase } from "../database/like-dislike-post-database"
import { PostDatabase } from "../database/post-database"
import { CreatePostInputDTO, CreatePostOutputDTO, EditPostByIdInputDTO, EditPostByIdOutputDTO, GetAllPostInputDTO } from "../dtos"
import { Post, PostDB } from "../entity"
import { BadRequestError, NotFoundError } from "../errors"
import { IdGenerator, TokenManager } from "../services"

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private readonly likeDislikePost: LikeDislikePostDatabase
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
        const { id, token, like, dislike } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postDb: PostDB = await this.postDatabase.getAllPosts(id)
        if (!postDb) {
            throw new NotFoundError('Usuário não encontrado')
        }


        if (like) {
            const idLikeDislike = this.idGenerator.generate()
            const inputLike = {
                id: idLikeDislike,
                rl_user: postDb.rl_user,
                rl_post: id,
                like: 1
            }
            await this.likeDislikePost.createLikeDislike(inputLike)
        }

        if (dislike) {
            const idLikeDislike = this.idGenerator.generate()
            const inputLike = {
                id: idLikeDislike,
                rl_user: postDb.rl_user,
                rl_post: id,
                like: 0
            }
            await this.likeDislikePost.createLikeDislike(inputLike)
        }

        if(like && dislike){
            throw new BadRequestError("error")
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
            postDb.content,
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