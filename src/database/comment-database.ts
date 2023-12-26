import { CommentDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class CommentDatabase extends BaseDatabase {

    public static TABLE_COMMENT = "comment";

    public getAllComments = async (q: string|undefined) => {

        if(q) {
            return await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).select().where({id: q})
        }

        const commentDB = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).select().orderBy('created_at', 'desc')
        return commentDB
    }

    public async createComment(newComment: CommentDB): Promise<void> {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENT).insert(newComment)
    }

    public async countComments(id: string) {
        return await BaseDatabase.connection('comment').count().where({rl_post: id}).first();
    }

    public async countLikes(id: string) {
        return await BaseDatabase.connection('rl_like_dislike_post').count().where({rl_post: id, like: 1}).first();
    }
    
    public async countDislikes(id: string) {
        return await BaseDatabase.connection('rl_like_dislike_post').count().where({rl_post: id, like: 0}).first();
    }
}