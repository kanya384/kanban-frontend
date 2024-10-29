import { TasksRepository } from "../../api/task/task";
import { actionCreators } from "../../state";

export class TaskUseCases {
    private api: TasksRepository;
    private stateActions: typeof actionCreators;

    constructor(api: TasksRepository, stateActions: typeof actionCreators) {
        this.api = api;
        this.stateActions = stateActions;
    }

    public DeleteTask = async (id: number) => {
        this.stateActions.TaskDeleteRequest()
        let response = await this.api.DeleteTask(id)
        if (response instanceof Error) {
            this.stateActions.TaskDeleteError(response.message)
            return
        } else {
            this.stateActions.TaskDeleteSuccess(id)
        }
    }

    public ReadTaskById = async (id: number) => {
        let response = await this.api.ReadTaskById(id)
        return response
    }

    public CreateTask = async (statusId: number, title: string, content: string, callback?: ()=>void) => {
        this.stateActions.TaskCreateRequest()
        let response = await this.api.CreateTask(statusId, title, content)
        if (response instanceof Error) {
            this.stateActions.TaskCreateError(response.message)
            return
        } else {
            this.stateActions.TaskCreateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }

    public UpdateTask = async (id: number, title: string, content: string, callback?: ()=>void) => {
        this.stateActions.TaskUpdateRequest()
        let response = await this.api.UpdateTask(id, title, content)
        if (response instanceof Error) {
            this.stateActions.TaskUpdateError(response.message)
            return
        } else {
            this.stateActions.TaskUpdateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }
    
}