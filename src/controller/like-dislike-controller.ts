import { Request, Response } from "express";
import {
  createLikeDislikeCommentSchema,
  createLikeDislikePostSchema,
} from "../dtos";
import { LikeDislikeBusiness } from "../business";
import { ZodError } from "zod";
import { BaseError } from "../errors";

export class LikeDislikeController {
  constructor(private readonly likeDislikeBusiness: LikeDislikeBusiness) {}
  public CreateLikePost = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikePostSchema.parse({
        rl_user: req.body.rl_user,
        rl_post: req.body.rl_post,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.createLikePost(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public CreateDislikePost = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikePostSchema.parse({
        rl_user: req.body.rl_user,
        rl_post: req.body.rl_post,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.createDislikePost(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public RemoveLikePost = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikePostSchema.parse({
        rl_user: req.body.rl_user,
        rl_post: req.body.rl_post,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.removeLikePost(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public RemoveDislikePost = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikePostSchema.parse({
        rl_user: req.body.rl_user,
        rl_post: req.body.rl_post,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.removeDislikePost(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public CreateLikeComment = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikeCommentSchema.parse({
        rl_user: req.body.rl_user,
        rl_comment: req.body.rl_comment,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.createLikeComment(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public CreateDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikeCommentSchema.parse({
        rl_user: req.body.rl_user,
        rl_comment: req.body.rl_comment,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.createDislikeComment(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public RemoveLikeComment = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikeCommentSchema.parse({
        rl_user: req.body.rl_user,
        rl_comment: req.body.rl_comment,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.removeLikeComment(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public RemoveDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = createLikeDislikeCommentSchema.parse({
        rl_user: req.body.rl_user,
        rl_comment: req.body.rl_comment,
        token: req.headers.authorization,
      });
      const result = await this.likeDislikeBusiness.removeDislikeComment(input);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public listLikeDislikePostByRlPostAndRlUser = async (
    req: Request,
    res: Response
  ) => {
    try {
      const input = {
        id_post: req.params.id_post,
        id_user: req.params.id_user,
        token: req.headers.authorization as string,
      };

      const result =
        await this.likeDislikeBusiness.listLikeDislikeCommentsByrLPostAndRlUser(
          input
        );
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public listLikeDislikeCommentsByRlCommentAndRlUser = async (
    req: Request,
    res: Response
  ) => {
    try {
      const input = {
        id_comment: req.params.id_comment,
        id_user: req.params.id_user,
        token: req.headers.authorization as string,
      };

      const result =
        await this.likeDislikeBusiness.listLikeDislikeCommentsByrLCommentAndRlUser(
          input
        );
      res.status(200).send(result);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
