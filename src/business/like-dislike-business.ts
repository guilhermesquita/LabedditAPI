import { CommentDatabase } from "../database/comment-database";
import { LikeDislikeCommentDatabase } from "../database/like-dislike-comment-database";
import { LikeDislikePostDatabase } from "../database/like-dislike-post-database";
import { PostDatabase } from "../database/post-database";
import { UserDatabase } from "../database/user-database";
import {
  CreateLikeDislikeCommentInputDTO,
  CreateLikeDislikeCommentOutputDTO,
  CreateLikeDislikePostInputDTO,
  CreateLikeDislikePostOutputDTO,
  listLikeDislikeCommentsByRlCommentAndRlUserInputDTO,
  listLikeDislikeCommentsByRlPostAndRlUserInputDTO,
} from "../dtos";
import { CommentDB, PostDB, UserDB } from "../entity";
import { BadRequestError, NotFoundError } from "../errors";
import { IdGenerator, TokenDecode, TokenManager } from "../services";
import * as jwt from "jsonwebtoken";

export class LikeDislikeBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private likeDislikePostDatabase: LikeDislikePostDatabase,
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private commentDatabase: CommentDatabase,
    private likeDislikeCommentDatabase: LikeDislikeCommentDatabase
  ) {}

  public createLikePost = async (input: CreateLikeDislikePostInputDTO) => {
    const { rl_post, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user !== decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode curtir o próprio post"
      );
    }

    const postDb: PostDB = await this.postDatabase.getAllPosts(rl_post);
    if (!postDb) {
      throw new NotFoundError("Postagem não encontrado");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.postDatabase.editLikesPostById(postDb.like, rl_post);

    const id = this.idGenerator.generate();

    const inputLike = {
      id,
      rl_user,
      rl_post,
      like: 1,
    };
    await this.likeDislikePostDatabase.createLikeDislike(inputLike);

    const output: CreateLikeDislikePostOutputDTO = {
      id_post: rl_post,
      message: `A postagem curtida com sucesso`,
    };
    return output;
  };

  public createDislikePost = async (input: CreateLikeDislikePostInputDTO) => {
    const { rl_post, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user !== decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode curtir o próprio post"
      );
    }

    const postDb: PostDB = await this.postDatabase.getAllPosts(rl_post);
    if (!postDb) {
      throw new NotFoundError("Postagem não encontrado");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.postDatabase.editDislikesPostById(postDb.dislike, rl_post);

    const id = this.idGenerator.generate();

    const inputLike = {
      id,
      rl_user,
      rl_post,
      like: 0,
    };
    await this.likeDislikePostDatabase.createLikeDislike(inputLike);

    const output: CreateLikeDislikePostOutputDTO = {
      id_post: rl_post,
      message: `A dislike efetuado com sucesso`,
    };
    return output;
  };

  public removeLikePost = async (input: CreateLikeDislikePostInputDTO) => {
    const { rl_post, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user !== decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode descurtir o próprio post"
      );
    }

    const postDB: PostDB = await this.postDatabase.getAllPosts(rl_post);
    if (!postDB) {
      throw new NotFoundError("Comentário não encontrado");
    }

    if (postDB.like === 0) {
      throw new BadRequestError("Comentário não possui like");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.postDatabase.removeLikesPost(postDB.like, rl_post);
    await this.likeDislikePostDatabase.removeLikeDislikeByRlPostAndRlUser(
      rl_post,
      rl_user
    );

    const output: CreateLikeDislikePostOutputDTO = {
      id_post: rl_post,
      message: `Curtida removida com sucesso`,
    };
    return output;
  };

  public removeDislikePost = async (input: CreateLikeDislikePostInputDTO) => {
    const { rl_post, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user !== decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode curtir o próprio post"
      );
    }

    const postDB: PostDB = await this.postDatabase.getAllPosts(rl_post);
    if (!postDB) {
      throw new NotFoundError("Postagem não encontrada");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    if (postDB.dislike === 0) {
      throw new BadRequestError("Comentário não possui dislike");
    }

    await this.postDatabase.removeDislikesPost(postDB.dislike, rl_post);
    await this.likeDislikePostDatabase.removeLikeDislikeByRlPostAndRlUser(
      rl_post,
      rl_user
    );

    const output: CreateLikeDislikeCommentOutputDTO = {
      id_post: rl_post,
      message: `O dislike removido com sucesso`,
    };
    return output;
  };

  public createLikeComment = async (
    input: CreateLikeDislikeCommentInputDTO
  ) => {
    const { rl_comment, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user !== decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode curtir o próprio post"
      );
    }

    const commentDB: CommentDB = await this.commentDatabase.getCommentById(
      rl_comment
    );
    if (!commentDB) {
      throw new NotFoundError("Comentário não encontrado");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.commentDatabase.editLikesCommentById(commentDB.like, rl_comment);

    const id = this.idGenerator.generate();

    const inputLike = {
      id,
      rl_user,
      rl_comment,
      like: 1,
    };
    await this.likeDislikeCommentDatabase.createLikeDislike(inputLike);

    const output: CreateLikeDislikeCommentOutputDTO = {
      id_post: rl_comment,
      message: `postagem curtida com sucesso`,
    };
    return output;
  };

  public createDislikeComment = async (
    input: CreateLikeDislikeCommentInputDTO
  ) => {
    const { rl_comment, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user !== decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode curtir o próprio post"
      );
    }

    const commentDB: CommentDB = await this.commentDatabase.getCommentById(
      rl_comment
    );
    if (!commentDB) {
      throw new NotFoundError("Comentário não encontrado");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.commentDatabase.editDislikesCommentById(
      commentDB.dislike,
      rl_comment
    );

    const id = this.idGenerator.generate();

    const inputLike = {
      id,
      rl_user,
      rl_comment,
      like: 0,
    };
    await this.likeDislikeCommentDatabase.createLikeDislike(inputLike);

    const output: CreateLikeDislikeCommentOutputDTO = {
      id_post: rl_comment,
      message: `A dislike efetuado com sucesso`,
    };
    return output;
  };

  public removeLikeComment = async (
    input: CreateLikeDislikeCommentInputDTO
  ) => {
    const { rl_comment, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user === decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode descurtir o próprio post"
      );
    }

    const commentDB: CommentDB = await this.commentDatabase.getCommentById(
      rl_comment
    );
    if (!commentDB) {
      throw new NotFoundError("Comentário não encontrado");
    }

    if (commentDB.like === 0) {
      throw new BadRequestError("Comentário não possui like");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.commentDatabase.removeLikesComment(commentDB.like, rl_comment);
    await this.likeDislikeCommentDatabase.removeLikeDislikeByRlCommentAndRlUser(
      rl_comment,
      rl_user
    );

    const output: CreateLikeDislikeCommentOutputDTO = {
      id_post: rl_comment,
      message: `Curtida removida com sucesso`,
    };
    return output;
  };

  public removeDislikeComment = async (
    input: CreateLikeDislikeCommentInputDTO
  ) => {
    const { rl_comment, rl_user, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("token inválido");
    }

    const decodedToken = jwt.decode(token) as TokenDecode;
    if (rl_user === decodedToken.id) {
      throw new BadRequestError(
        "Ação não permitida ao usuário. Você não pode curtir o próprio post"
      );
    }

    const commentDB: CommentDB = await this.commentDatabase.getCommentById(
      rl_comment
    );
    if (!commentDB) {
      throw new NotFoundError("Comentário não encontrado");
    }

    const userDB: UserDB = await this.userDatabase.getUserById(rl_user);
    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    if (commentDB.dislike === 0) {
      throw new BadRequestError("Comentário não possui dislike");
    }

    await this.commentDatabase.removeDislikesComment(
      commentDB.dislike,
      rl_comment
    );
    await this.likeDislikeCommentDatabase.removeLikeDislikeByRlCommentAndRlUser(
      rl_comment,
      rl_user
    );

    const output: CreateLikeDislikeCommentOutputDTO = {
      id_post: rl_comment,
      message: `dislike removido com sucesso`,
    };
    return output;
  };

  public listLikeDislikeCommentsByrLPostAndRlUser = async (
    input: listLikeDislikeCommentsByRlPostAndRlUserInputDTO
  ) => {
    const { id_post, id_user } = input;

    const userDB: UserDB = await this.userDatabase.getUserById(id_user);
    const postDB: PostDB = await this.postDatabase.getAllPosts(id_post);

    if (!userDB) {
      throw new NotFoundError("usuário não encontrado!");
    }

    if (!postDB) {
      throw new NotFoundError("Postagem não encontrada!");
    }

    const likeDislikePost =
      await this.likeDislikePostDatabase.listLikeDislikeByRlPostAndRlUser(
        id_post,
        id_user
      );

    return likeDislikePost;
  };

  public listLikeDislikeCommentsByrLCommentAndRlUser = async (
    input: listLikeDislikeCommentsByRlCommentAndRlUserInputDTO
  ) => {
    const { id_comment, id_user } = input;

    const userDB: UserDB = await this.userDatabase.getUserById(id_user);
    const commentDB: CommentDB = await this.commentDatabase.getAllComments(id_comment);

    if (!userDB) {
      throw new NotFoundError("usuário não encontrado!");
    }

    if (!commentDB) {
      throw new NotFoundError("Comentário não encontrado!");
    }

    const likeDislikePost =
      await this.likeDislikeCommentDatabase.listLikeDislikeByRlCommentAndRlUser(
        id_comment,
        id_user
      );

    return likeDislikePost;
  };
}
