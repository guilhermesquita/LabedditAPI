import { BaseDatabase } from "./baseDatabase";

export class PostDatabase extends BaseDatabase {

    public static TABLE_POST = "post";

    public getAllPosts = async (q: string|undefined) => {

        if(q) {
            return await BaseDatabase.connection(PostDatabase.TABLE_POST).select().where({id: q})
        }

        const postDB = await BaseDatabase.connection(PostDatabase.TABLE_POST).select().orderBy('created_at', 'desc')
        return postDB
    }

    // public getAllBrandsByName = async (q:string) => {
    //     const brandsDB = await BaseDatabase.connection(PostDatabase.TABLE_POST).select().where("name", "LIKE", `%${q}%`)
    //     return brandsDB
    // }
}