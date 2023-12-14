import { BaseDatabase } from "./baseDatabase";

export class BrandDatabase extends BaseDatabase {

    public static TABLE_BRANDS = "brands";

    public getAllBrands = async () => {
        const brandsDB = await BaseDatabase.connection(BrandDatabase.TABLE_BRANDS).select()
        return brandsDB
    }

    public getAllBrandsByName = async (q:string) => {
        const brandsDB = await BaseDatabase.connection(BrandDatabase.TABLE_BRANDS).select().where("name", "LIKE", `%${q}%`)
        return brandsDB
    }
}