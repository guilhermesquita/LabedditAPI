import { PostDatabase } from "../database/post-database"
import { GetAllPostInputDTO } from "../dtos"
import { PostDB } from "../entity"
import { BadRequestError } from "../errors"
import { TokenManager } from "../services"

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager
    ) { }

    public getAllPost = async (input: GetAllPostInputDTO) => {

        const payload = this.tokenManager.getPayload(input.token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postDb: PostDB[] = await this.postDatabase.getAllPosts(input.q)
        return postDb
    }
}