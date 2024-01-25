import { EditCommentByIdInputDTO } from "../dtos"

export interface CommentDB {
    id: string
    content: string
    comments: number
    like: number
    dislike: number
    rl_user: string
    rl_post?: string
    rl_comment?: string
    created_at: string
    edited_at?: string | null
}

export class Comment {
    constructor(
        private id: string,
        private content: string,
        private comments: number,
        private like: number,
        private dislike: number,
        private rl_user: string,
        private created_at: string,
        private edited_at: string | null,
        private rl_post?: string,
        private rl_comment?: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getComment(): number {
        return this.comments
    }

    public setComment(value: number): void {
        this.comments = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number): void {
        this.like = value
    }

    public getDislike(): number {
        return this.dislike
    }

    public setDislike(value: number): void {
        this.dislike = value
    }

    public getUser(): string {
        return this.rl_user
    }

    public getRlPost(): string | undefined {
        return this.rl_post
    }

    public getRlComment(): string | undefined {
        return this.rl_comment
    }

    public getCreatedAt(): string {
        return this.created_at
    }

    public getEditedAt(): string | null {
        return this.edited_at
    }

    public createDBModel(): CommentDB {
        return {
            id: this.id,
            content: this.content,
            comments: this.comments,
            like: this.like,
            dislike: this.dislike,
            rl_post: this.rl_post,
            rl_comment: this.rl_comment,
            created_at: this.created_at,
            rl_user: this.rl_user
        }
    }

    public editDBModel(input: EditCommentByIdInputDTO): CommentDB{
        return {
            id: this.id,
            content: input.content || this.content,
            comments: this.comments,
            like: this.like,
            dislike: this.dislike,
            rl_user: this.rl_user,
            rl_comment: this.rl_comment,
            rl_post: this.rl_post,
            created_at: this.created_at,
            edited_at: this.edited_at
        }
    }
}