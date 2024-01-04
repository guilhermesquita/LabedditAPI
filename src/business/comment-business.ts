import { CommentDatabase } from "../database/comment-database"
import { CreateCommentInputDTO, CreatePostOutputDTO, GetCommentByPostIdInputDTO } from "../dtos"
import { Comment, CommentDB } from "../entity"
import { BadRequestError } from "../errors"
import { IdGenerator, TokenManager } from "../services"

export class CommentBusiness {

    constructor(
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    // public getAllPost = async (input: GetAllPostInputDTO) => {

    //     const payload = this.tokenManager.getPayload(input.token)

    //     if (payload === null) {
    //         throw new BadRequestError("token inválido")
    //     }

    //     const postDb: PostDB[] = await this.commentDatabase.getAllComments(input.q)
    //     return postDb
    // }

    public createComment = async (input: CreateCommentInputDTO) => {
        const { content, rl_user, rl_comment, rl_post, token } = input

        const payload = this.tokenManager.getPayload(token)
        if (payload === null) {
            throw new BadRequestError("token inválido")
        }
        if (!rl_comment && !rl_post) {
            throw new BadRequestError("Escolha o comentário ou post vinculado")
        }

        const id = this.idGenerator.generate()

        const totalComment = await this.commentDatabase.countComments(id)
        const totalLike = await this.commentDatabase.countLikes(id)
        const totalDislike = await this.commentDatabase.countDislikes(id)

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

        const newComment = new Comment(
            id,
            content,
            comments as number,
            likes as number,
            dislikes as number,
            rl_user,
            new Date().toISOString(),
            null,
            rl_post,
            rl_comment
        )

        if (rl_comment !== undefined) {
            const totalCommentPost:CommentDB[] = await this.commentDatabase.getCommentById(rl_comment)
            await this.commentDatabase.setNumberCommentComment(rl_comment, totalCommentPost[0].comments)
        }

        if (rl_post !== undefined) {
            const totalCommentPost = await this.commentDatabase.getPostById(rl_post)
            await this.commentDatabase.setNumberCommentPost(rl_post, totalCommentPost.comments)
        }

        const newCommentDb = newComment.createDBModel()
        await this.commentDatabase.createComment(newCommentDb)

        const output: CreatePostOutputDTO = {
            id: newCommentDb.id,
            message: 'Publicação compartilhada com sucesso!'
        }

        return output
    }

    public getCommentByPostCommentId = async (input: GetCommentByPostIdInputDTO) => {

        const payload = this.tokenManager.getPayload(input.token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const commentDB: CommentDB[] = await this.commentDatabase.getCommentByPostCommentId(input.id)
        return commentDB
    }
}