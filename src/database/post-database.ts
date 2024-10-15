import { PostDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POST = "post";

  public getAllPosts = async (q: string | undefined) => {
    if (q) {
      return await BaseDatabase.connection(PostDatabase.TABLE_POST)
        .select(
          "post.id",
          "post.content",
          "post.comments",
          "post.like",
          "post.dislike",
          "post.rl_user",
          "post.created_at",
          "post.edited_at",
          "user.name"
        )
        .where({ id: q })
        .join("user", "post.rl_user", "user.id")
        .first();
    }

    const postDB = await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .select(
        "post.id",
        "post.content",
        "post.comments",
        "post.like",
        "post.dislike",
        "post.rl_user",
        "post.created_at",
        "post.edited_at",
        "user.name"
      )
      .join("user", "post.rl_user", "user.id")
      .orderBy("post.created_at", "asc");

    return postDB;
  };

  public getPostsByUserAndId = async (id: string, rl_user: string) => {
    const postDB = await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .select()
      .where({ id })
      .andWhere({ rl_user })
      .first();
    return postDB;
  };

  public async createPost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPost);
  }

  public async countComments(id: string) {
    return await BaseDatabase.connection("comment")
      .count()
      .where({ rl_post: id })
      .first();
  }

  public async countLikes(id: string) {
    return await BaseDatabase.connection("rl_like_dislike_post")
      .count()
      .where({ rl_post: id, like: 1 })
      .first();
  }

  public async countDislikes(id: string) {
    return await BaseDatabase.connection("rl_like_dislike_post")
      .count()
      .where({ rl_post: id, like: 0 })
      .first();
  }

  public editPostById = async (input: PostDB) => {
    return await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .update(input)
      .where({ id: input.id });
  };

  public editLikesPostById = async (likes: number, id: string) => {
    return await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .update({ like: likes + 1 })
      .where({ id });
  };

  public editDislikesPostById = async (dislikes: number, id: string) => {
    return await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .update({ dislike: dislikes + 1 })
      .where({ id });
  };

  public removeLikesPost = async (likes: number, id: string) => {
    return await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .update({ like: likes - 1 })
      .where({ id });
  };

  public removeDislikesPost = async (dislikes: number, id: string) => {
    return await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .update({ dislike: dislikes - 1 })
      .where({ id });
  };
}
