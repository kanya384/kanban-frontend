import { KanbansRepository } from "../../api/kanban/kanban";
import { actionCreators } from "../../state";

export class KanbanUseCases {
    private api: KanbansRepository;
    private stateActions: typeof actionCreators;

    constructor(api: KanbansRepository, stateActions: typeof actionCreators) {
        this.api = api;
        this.stateActions = stateActions;
    }

    public ReadUsersKanbans = async () => {
        this.stateActions.SendKanbanListRequest()
        let response = await this.api.ReadKanbansOfUser()
        if (response instanceof Error) {
            this.stateActions.KanbanListError(response.message)
            return
        } else {
            this.stateActions.KanbanListSuccess(response)
        }
    }

    public DeleteKanban = async (id: number) => {
        this.stateActions.KanbanDeleteRequest()
        let response = await this.api.DeleteKanban(id)
        if (response instanceof Error) {
            this.stateActions.KanbanDeleteError(response.message)
            return
        } else {
            this.stateActions.KanbanDeleteSuccess(id)
        }
    }

    public CreateKanban = async (title: string, callback?: ()=>void) => {
        this.stateActions.KanbanCreateRequest()
        let response = await this.api.CreateKanban(title)
        if (response instanceof Error) {
            this.stateActions.KanbanCreateError(response.message)
            return
        } else {
            this.stateActions.KanbanCreateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }

    public UpdateKanban = async (id: number, title: string, callback?: ()=>void) => {
        this.stateActions.KanbanUpdateRequest()
        let response = await this.api.UpdateKanban(id, title)
        if (response instanceof Error) {
            this.stateActions.KanbanUpdateError(response.message)
            return
        } else {
            this.stateActions.KanbanUpdateSuccess(response)
            if (callback) {
                callback()
            }
        }
    }
    
}