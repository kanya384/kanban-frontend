import { AuthApi } from "../api/auth/auth"
import { KanbansRepository } from "../api/kanban/kanban"
import { StatusesRepository } from "../api/status/status"
import { TasksRepository } from "../api/task/task"
 
import { AuthorizationUseCases } from "../useCase/authorization/authorization"
import { KanbanUseCases } from "../useCase/kanban/kanban"
import { KanbanItemUseCases } from "../useCase/kanbanItem/kanban-item"
import { StatusUseCases } from "../useCase/status/status"
import { TaskUseCases } from "../useCase/task/task"



export const useUseCases = (actions:any) => {
    let kanbansRepo = new KanbansRepository();
    let tasksRepo = new TasksRepository();
    let statusRepo = new StatusesRepository();

    const authUseCase = new AuthorizationUseCases(new AuthApi(), actions)
    const kanbanUseCase =  new KanbanUseCases(kanbansRepo, actions)
    const kanbanItemUseCase =  new KanbanItemUseCases(kanbansRepo, statusRepo, tasksRepo, actions)
    const statusUseCase =  new StatusUseCases(statusRepo, actions)
    const taskUseCases =  new TaskUseCases(tasksRepo, actions)
    

    return {authUseCase, kanbanUseCase, statusUseCase, taskUseCases, kanbanItemUseCase}
}