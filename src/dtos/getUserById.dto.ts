export interface GetUserByIdInputDTO {
    id: string;
    token: string;
}

export interface GetUserByIdOutputDTO {
    id: string;
    name: string;
    email: string;
}