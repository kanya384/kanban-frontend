import { AuthStorageInterface } from "../../useCase/authorization/adapters/storage/storage";

export class AuthStorage implements AuthStorageInterface {

    SaveToken(token: string): void {
        localStorage.setItem("token", token)
    }

    SaveRefreshToken(token: string): void {
        localStorage.setItem("refresh_token", token)
    }

    ReadToken(): string | null {
        return localStorage.getItem("token")
    }

    ReadRefreshToken(): string | null {
        return localStorage.getItem("refresh_token")
    }

    DeleteToken(): void {
        localStorage.removeItem("token")
    }

}