import { PostDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "post";

    public getAllPosts = async (q: string|undefined) => {

        if(q) {
            return await BaseDatabase.connection(PostDatabase.TABLE_POST).select().where({id: q}).first()
        }

        const postDB = await BaseDatabase.connection(PostDatabase.TABLE_POST).select().orderBy('created_at', 'desc')
        return postDB
    }

    public async createPost(newPost: PostDB): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPost)
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