import { CommentDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class CommentDatabase extends BaseDatabase {

    public static TABLE_COMMENT = "comment";

    public getAllComments = async (q: string | undefined) => {

        if (q) {
            return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).select().where({ id: q })
        }

        const commentDB = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).select().orderBy('created_at', 'desc')
        return commentDB
    }

    public setNumberCommentPost = async (rl_post: string | undefined, total: number) => {
        return await BaseDatabase.connection('post')
        .update('comments', total + 1).where({ id: rl_post })
    }

    public setNumberCommentComment = async (rl_comment: string | undefined, total: number) => {
        return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT)
        .update('comments', total + 1).where({ id: rl_comment })
    }

    public getCommentByPostCommentId = async (id_post_comment: string) => {
        return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT)
        .select().where({rl_post: id_post_comment})
        .orWhere({rl_comment: id_post_comment})
    }

    public getPostById = async (id: string | undefined) => {
        return await BaseDatabase.connection('post').select().where({id: id}).first()
    }

    public getCommentById = async (id: string | undefined) => {
        return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).select().where({id: id})
    }

    public async createComment(newComment: CommentDB): Promise<void> {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).insert(newComment)
    }

    public async countComments(id: string) {
        return await BaseDatabase.connection('comment').count().where({ rl_post: id }).first();
    }

    public async countLikes(id: string) {
        return await BaseDatabase.connection('rl_like_dislike_post').count().where({ rl_post: id, like: 1 }).first();
    }

    public async countDislikes(id: string) {
        return await BaseDatabase.connection('rl_like_dislike_post').count().where({ rl_post: id, like: 0 }).first();
    }
}