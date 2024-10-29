
import { Task } from "../../domain/task";
import { TaskDTO } from "../generated";
import { toDomainUser } from "./user";

export const toDomainTask = (dto: TaskDTO) : Task => {
    return new Task(
        dto.id!,
        dto.title!,
        dto.content!,
        toDomainUser(dto.author!),
        new Date(dto.createdAt!), 
        new Date(dto.updatedAt!),
        dto.assignee?toDomainUser(dto.assignee!):undefined,
    );
}



export const toDomainTasks = (dtoTasks: Set<TaskDTO>): Task[] => {
    return Array.from(dtoTasks).map((task) => toDomainTask(task));
}