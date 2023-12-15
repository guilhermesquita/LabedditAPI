export interface LoginUserInputDTO {
    email: string;
    password: string;
}

export interface LoginUserOutputDTO {
    message: string;
    token: string;
}