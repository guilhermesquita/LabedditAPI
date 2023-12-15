import { UserDatabase } from "../database/user-database"
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserByIdInputDTO, GetUserByIdOutputDTO } from "../dtos"
import { User, UserDB } from "../entity"
import { NotFoundError } from "../errors"
import { IdGenerator } from "../services"

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator
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

    public createUser = async (input: CreateUserInputDTO) => {
        const {name, email, password} = input

        const id = this.idGenerator.generate()

        const newUser = new User(
            id,
            name,
            email,
            password,
            new Date().toISOString()
        )

        const newUserDb = newUser.createDBModel()
        await this.userDatabase.createUser(newUserDb)

        // const output: CreateUserOutputDTO = {
        //     message: 'Usuário Criado com sucesso!',
        //     token: 
        // }
    }
}