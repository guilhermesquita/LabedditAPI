import { UserDB } from "../entity";
import { BaseDatabase } from "./baseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABLE_USER = "user";

    public getUserById = async (id: string) => {
        const userDB = await BaseDatabase.connection(UserDatabase.TABLE_USER).select().where({ id: id }).first();
        return userDB
    }

    public async createUser(
        newUserDB: UserDB
      ): Promise<void> {
        await BaseDatabase
          .connection(UserDatabase.TABLE_USER)
          .insert(newUserDB)
      }
}