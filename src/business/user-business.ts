import { UserDatabase } from "../database/user-database"
import { CreateUserInputDTO, CreateUserOutputDTO, EditUserByIdInputDTO, EditUserByIdOutputDTO, GetUserByIdInputDTO, GetUserByIdOutputDTO, LoginUserInputDTO, LoginUserOutputDTO } from "../dtos"
import { User, UserDB } from "../entity"
import { BadRequestError, NotFoundError } from "../errors"
import { IdGenerator, TokenDecode, TokenManager, TokenPayload } from "../services"
import * as jwt from 'jsonwebtoken';

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public loginUser = async (input: LoginUserInputDTO) => {
        const userDb: UserDB = await this.userDatabase.loginUser(input)
        if (!userDb) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const tokenPayload: TokenPayload = {
            id: userDb.id,
            name: userDb.name
        }

        const token = this.tokenManager.createToken(tokenPayload)
        console.log(token)

        const output: LoginUserOutputDTO = {
            message: 'Login realizado com sucesso!',
            token: token
        }

        return output
    }

    public createUser = async (input: CreateUserInputDTO) => {
        const { name, email, password } = input

        const id = this.idGenerator.generate()

        const userEmail = await this.userDatabase.checkUserByEmail(email)
        if (userEmail.length) {
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

    public getUserById = async (input: GetUserByIdInputDTO) => {
        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const userDb: UserDB = await this.userDatabase.getUserById(id)

        if (!userDb) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const output: GetUserByIdOutputDTO = {
            id: userDb.id,
            name: userDb.name,
            email: userDb.email
        }
        return output
    }

    public editUserById = async (input: EditUserByIdInputDTO) => {
        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const decodedToken = jwt.decode(token) as TokenDecode;

        const userDb: UserDB = await this.userDatabase.getUserById(id)
        if (!userDb) {
            throw new NotFoundError('Usuário não encontrado')
        }

        if(userDb.id !== decodedToken.id){
            throw new BadRequestError("Usuário não permitido")
        }

        const updateUser = new User(
            userDb.id,
            userDb.name,
            userDb.email,
            userDb.password,
            userDb.created_at
        )
        
        const teste = updateUser.editDBModel(input)
        await this.userDatabase.editUserById(teste)


        const output: EditUserByIdOutputDTO = {
            id: userDb.id,
            message: `O usuário ${input.name} foi editado com sucesso`,
        }
        return output
    }
}