import { BaseDatabase } from "./baseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABLE_USER = "user";

    public getUserById = async (id: string) => {
        const userDB = await BaseDatabase.connection(UserDatabase.TABLE_USER).select().where({id: id}).first();
        return userDB
    }

    // public getAllProductsByName = async (q:string) => {
    //     const productsDB = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCTS).select().where("name", "LIKE", `%${q}%`)
    //     return productsDB
    // }
}