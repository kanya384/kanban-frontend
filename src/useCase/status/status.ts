import { StatusesRepository } from "../../api/status/status";
import { actionCreators } from "../../state";

export class StatusUseCases {
    private api: StatusesRepository;
    private stateActions: typeof actionCreators;

    constructor(api: StatusesRepository, stateActions: typeof actionCreators) {
        this.api = api;
        this.stateActions = stateActions;
    }

    public DeleteStatus = async (id: number) => {
        this.stateActions.StatusDeleteRequest()
        let response = await this.api.DeleteStatus(id)
        if (response instanceof Error) {
            this.stateActions.StatusDeleteError(response.message)
            return
        } else {
            this.stateActions.StatusDeleteSuccess(id)
        }
    }

    public ReadStatusById = async (id: number) => {
        let response = await this.api.ReadStatusById(id)
        return response
    }

    public CreateStatus = async (kanbanId: number, title: string, callback?: ()=>void) => {
        this.stateActions.StatusCreateRequest()
        let response = await this.api.CreateStatus(kanbanId, title)
        if (response instanceof Error) {
            this.stateActions.StatusCreateError(response.message)
            return
        } else {
            this.stateActions.StatusCreateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }

    public UpdateStatus = async (id: number, title: string, callback?: ()=>void) => {
        this.stateActions.StatusUpdateRequest()
        let response = await this.api.UpdateStatus(id, title)
        if (response instanceof Error) {
            this.stateActions.StatusUpdateError(response.message)
            return
        } else {
            this.stateActions.StatusUpdateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }
    
}