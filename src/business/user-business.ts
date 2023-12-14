import { UserDatabase } from "../database/user-database"
import { GetUserByIdInputDTO, GetUserByIdOutputDTO } from "../dtos"
import { UserDB } from "../entity"
import { NotFoundError } from "../errors"

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
    ) { }

    public getUserById = async (input: GetUserByIdInputDTO) => {

        const userDb: UserDB = await this.userDatabase.getUserById(input.id)

        if(!userDb){
            throw new NotFoundError('Usuário não encontrado')
        }

        const output: GetUserByIdOutputDTO = {
            id: userDb.id,
            name: userDb.name
        }

        return output
    }
}