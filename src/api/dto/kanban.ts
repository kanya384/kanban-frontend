import { Kanban } from "../../domain/kanban";
import { KanbanDetailedDTO, KanbanDTO } from "../generated";
import { toDomainStatuses } from "./status";
import { toDomainUser } from "./user";

export const toDomainKanban = (dto: KanbanDetailedDTO) => {
    return new Kanban(
        dto.id!,
        dto.title!,
        dto.statuses?toDomainStatuses(dto.statuses!):[],
        new Date(dto.createdAt!), 
        new Date(dto.updatedAt!),
    );
}

export const toDomainKanbans = (dtoKanbans: Set<KanbanDTO>): Kanban[] => {
    return Array.from(dtoKanbans).map((kanban) => toDomainKanban(kanban));
}

export const toDomainKanbansFromList = (dtoKanbans: KanbanDTO[]): Kanban[] => {
    return dtoKanbans.map((kanban) => toDomainKanban(kanban));
}