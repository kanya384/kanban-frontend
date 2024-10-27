import { Token } from "../../domain/authorization/types";
import { AuthStorageInterface } from "../../useCase/authorization/adapters/storage/storage";

export class AuthStorage implements AuthStorageInterface {

    SaveToken(token: string): void {
        localStorage.setItem("token", token)
    }

    SaveRefreshToken(token: string): void {
        localStorage.setItem("refresh_token", token)
    }

    ReadToken(): Token | null {
        return localStorage.getItem("token")
    }

    ReadRefreshToken(): Token | null {
        return localStorage.getItem("refresh_token")
    }

    DeleteToken(): void {
        localStorage.removeItem("token")
    }

}