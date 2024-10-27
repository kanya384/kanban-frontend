export interface AuthStorageInterface {
    SaveToken(token: string): void
    ReadToken(): string | null
    DeleteToken() : void
}