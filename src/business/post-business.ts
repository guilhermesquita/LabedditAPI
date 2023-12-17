import { PostDatabase } from "../database/post-database"
import { PostDB } from "../entity"

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
    ) { }

    public getAllPost = async (q: string|undefined) => {
        const postDb: PostDB[] = await this.postDatabase.getAllPosts(q)
        return postDb
    }
}