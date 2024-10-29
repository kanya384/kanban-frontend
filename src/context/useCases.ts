import { createContext } from 'react'
import { AuthorizationUseCases } from '../useCase/authorization/authorization';
import { KanbanUseCases } from '../useCase/kanban/kanban';
import { StatusUseCases } from '../useCase/status/status';
import { TaskUseCases } from '../useCase/task/task';
import { KanbanItemUseCases } from '../useCase/kanbanItem/kanban-item';
 

interface UseCasesContextInterface {
    authUseCase: AuthorizationUseCases;
    kanbanUseCase: KanbanUseCases;
    kanbanItemUseCase: KanbanItemUseCases;
    statusUseCase: StatusUseCases;
    taskUseCase: TaskUseCases;
}

export const UseCasesContext = createContext<UseCasesContextInterface | null>(null)