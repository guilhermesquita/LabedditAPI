export interface CommentDB {
    id: string
    content: string
    comments: number
    like: number
    dislike: number
    rl_user: string
    created_at: string
    updated_at?: string
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
    private updated_at: string | null
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

    public getUpdatedAt(): string|null {
        return this.updated_at
    }

    public createDBModel(): CommentDB{
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
}