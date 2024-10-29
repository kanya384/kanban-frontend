import { User } from "../../domain/user";
import { UserDTO } from "../generated";

export const toDomainUser = (dto: UserDTO) => {
    return new User(
        dto.id!,
        dto.name!,
        dto.email!,
        new Date(dto.createdAt!), 
        new Date(dto.updatedAt!),
    );
}

export const toDomainUsers = (dtoUsers: Set<UserDTO>): User[] => {
    return Array.from(dtoUsers).map((user) => toDomainUser(user));
}