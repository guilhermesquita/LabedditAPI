import { LikeDislikeCommentDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class LikeDislikeCommentDatabase extends BaseDatabase {
    public static TABLE_LIKE_DISLIKE_COMMENT = "rl_like_dislike_comment";

    public createLikeDislike = async (newLikeDislike: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase.connection(LikeDislikeCommentDatabase.TABLE_LIKE_DISLIKE_COMMENT).insert(newLikeDislike)
    }
}