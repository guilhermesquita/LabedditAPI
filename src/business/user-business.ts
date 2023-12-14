import { BrandDatabase } from "../database/brand-database"
import { UserDatabase } from "../database/user-database"
import { GetUserByIdInputDTO, GetUserByIdOutputDTO } from "../dtos"
import { UserDB } from "../entity"
import { BrandDB } from "../entity/brand-entity"

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
    ) { }

    public getUserById = async (input: GetUserByIdInputDTO) => {

        const userDb: UserDB = await this.userDatabase.getUserById(input.id)

        const output: GetUserByIdOutputDTO = {
            id: userDb.id,
            name: userDb.name
        }

        return output
    }
}