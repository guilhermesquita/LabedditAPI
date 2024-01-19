import { EditPostByIdInputDTO } from "../dtos"

export interface PostDB {
    id: string
    content: string
    comments: number
    like: number
    dislike: number
    rl_user: string
    created_at: string
    edited_at?: string 
}

export class Post {
    constructor(
    private id: string,
    private content: string,
    private comments: number,
    private like: number,
    private dislike: number,
    private rl_user: string,
    private created_at: string,
    private edited_at?: string 
    ) {}

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

    public getCreatedAt(): string {
        return this.created_at
    }

    public getUpdatedAt(): string | undefined{
        return this.edited_at
    }

    public createDBModel(): PostDB{
        return {
            id: this.id,
            content: this.content,
            comments: this.comments,
            like: this.like,
            dislike: this.dislike,
            created_at: this.created_at,
            rl_user: this.rl_user
        }
    }

    public editDBModel(input: EditPostByIdInputDTO): PostDB{
        return {
            id: this.id,
            content: input.content || this.content,
            comments: this.comments,
            like: this.like,
            dislike: this.dislike,
            rl_user: this.rl_user,
            created_at: this.created_at,
            edited_at: this.edited_at
        }
    }
}