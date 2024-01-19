import { LikeDislikePostDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class LikeDislikePostDatabase extends BaseDatabase {
    public static TABLE_LIKE_DISLIKE_POST = "rl_like_dislike_post";

    public createLikeDislike = async (newLikeDislike: LikeDislikePostDB): Promise<void> => {
        await BaseDatabase.connection(LikeDislikePostDatabase.TABLE_LIKE_DISLIKE_POST).insert(newLikeDislike)
    }
}