import { BaseDatabase } from "./baseDatabase";

export class ProductDatabase extends BaseDatabase {

    public static TABLE_PRODUCTS = "products";

    public getAllProducts = async () => {
        const productsDB = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCTS).select()
        return productsDB
    }

    public getAllProductsByName = async (q:string) => {
        const productsDB = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCTS).select().where("name", "LIKE", `%${q}%`)
        return productsDB
    }
}