import { Token } from "../../../../domain/authorization/types"

export interface AuthStorageInterface {
    SaveToken(token: Token): void
    SaveRefreshToken(token: Token): void
    ReadToken(): Token | null
    ReadRefreshToken(): Token | null
    DeleteToken() : void
}