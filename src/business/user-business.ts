import { UserDatabase } from "../database/user-database"
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserByIdInputDTO, GetUserByIdOutputDTO } from "../dtos"
import { User, UserDB } from "../entity"
import { BadRequestError, NotFoundError } from "../errors"
import { IdGenerator, TokenManager, TokenPayload } from "../services"

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getUserById = async (input: GetUserByIdInputDTO) => {
        const { id, token } = input

        // const payload = this.tokenManager.getPayload(token)
        // if (payload === null) {
        //     throw new BadRequestError("token inválido")
        // }

        const userDb: UserDB = await this.userDatabase.getUserById(id)

        if (!userDb) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const output: GetUserByIdOutputDTO = {
            id: userDb.id,
            name: userDb.name
        }
        return output
    }

    public createUser = async (input: CreateUserInputDTO) => {
        const { name, email, password } = input

        const id = this.idGenerator.generate()

        const userEmail = await this.userDatabase.checkUserByEmail(email)
        if (userEmail) {
            throw new BadRequestError('Email já cadastrado')
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            new Date().toISOString()
        )

        const newUserDb = newUser.createDBModel()
        await this.userDatabase.createUser(newUserDb)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: CreateUserOutputDTO = {
            message: 'Usuário Criado com sucesso!',
            id: newUser.getId(),
            token: token
        }

        return output
    }
}