import { KanbansRepository } from "../../api/kanban/kanban";
import { StatusesRepository } from "../../api/status/status";
import { TasksRepository } from "../../api/task/task";
import { actionCreators } from "../../state";

export class KanbanItemUseCases {
    private apiKanban: KanbansRepository;
    private apiStatus: StatusesRepository;
    private apiTask: TasksRepository;
    private stateActions: typeof actionCreators;

    constructor(apiKanban: KanbansRepository, apiStatus: StatusesRepository, apiTask: TasksRepository, stateActions: typeof actionCreators) {
        this.apiKanban = apiKanban;
        this.apiStatus = apiStatus;
        this.apiTask = apiTask;
        this.stateActions = stateActions;
    }

    public ReadKanbanById = async (kanbanId: number) => {
        this.stateActions.SendKanbanItemRequest()
        let response = await this.apiKanban.ReadKanbanById(kanbanId)
        if (response instanceof Error) {
            this.stateActions.KanbanItemError(response.message)
            return
        } else {
            this.stateActions.KanbanItemSuccess(response)
        }
    }

    public CreateStatus = async (kanbanId: number, title: string, callback?: ()=>void) => {
        let response = await this.apiStatus.CreateStatus(kanbanId, title)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanStatusAdd(response)
            if (callback) {
                callback()
            }
        }
    }

    public UpdateStatus = async (statusId: number, title: string, callback?: ()=>void) => {
        let response = await this.apiStatus.UpdateStatus(statusId, title)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanStatusUpdate(response)
            if (callback) {
                callback()
            }
        }
    }

    public DeleteStatus = async (statusId: number, callback?: ()=>void) => {
        let response = await this.apiStatus.DeleteStatus(statusId)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanStatusRemove(statusId)
            if (callback) {
                callback()
            }
        }
    }

    public CreateTask = async (statusId: number, title: string, content: string, callback?: ()=>void) => {
        let response = await this.apiTask.CreateTask(statusId, title, content)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanTaskAdd(response, statusId)
            if (callback) {
                callback()
            }
        }
    }

    public UpdateTask = async (statusId: number, title: string, content: string, callback?: ()=>void) => {
        let response = await this.apiTask.UpdateTask(statusId, title, content)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanTaskUpdate(response, statusId)
            if (callback) {
                callback()
            }
        }
    }

    public DeleteTask = async (taskId: number, statusId: number, callback?: ()=>void) => {
        let response = await this.apiTask.DeleteTask(taskId)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanTaskRemove(taskId, statusId)
            if (callback) {
                callback()
            }
        }
    }

    public ChangeTaskStatus = async (id: number, statusId: number, oldStatusId: number, callback?: ()=>void) => {
        if (statusId == oldStatusId) {
            return
        }
        let response = await this.apiTask.ChangeStatus(id, statusId)
        console.log(response)
        if (response instanceof Error) {
            return
        } else {
            this.stateActions.KanbanTaskStatusChanged(id, oldStatusId, statusId)
            if (callback) {
                callback()
            }
        }
    }
    
}