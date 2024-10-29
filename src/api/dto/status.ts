import { Status } from "../../domain/status";
import { StatusDTO } from "../generated";
import { toDomainTasks } from "./task";

export const toDomainStatus = (dto: StatusDTO) => {
    return new Status(
        dto.id!,
        dto.title!,
        dto.tasks?toDomainTasks(dto.tasks!):[],
        new Date(dto.createdAt!), 
        new Date(dto.updatedAt!),
    );
}

export const toDomainStatuses = (dtoStatuses: Set<StatusDTO>): Status[] => {
    return Array.from(dtoStatuses).map((status) => toDomainStatus(status));
}