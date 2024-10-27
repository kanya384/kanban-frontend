import { Token } from "../../../../domain/authorization/types";

export interface AuthInterface {
    SignIn(params: SignInRequest): Promise<SignInResponse | Error>
}

export interface SignInRequest {
    login: Login, 
    pass: Pass,
}

export interface SignInResponse {
    token: Token,
    refreshToken: Token,
}