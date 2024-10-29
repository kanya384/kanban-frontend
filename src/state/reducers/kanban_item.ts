import { Kanban } from "../../domain/kanban";
import { KanbanActionTypes } from "../action-types";
import { KanbanActions } from "../actions";
import produce from 'immer';


interface KanbanItemState {
    loading: boolean | null;
    kanban: Kanban | null,
    error: string | null,
    entityLoading: boolean,
    entityError: string | null,
}

const initialState: KanbanItemState = {
    loading: null,
    kanban: null,
    error: null,
    entityLoading: false,
    entityError: null,
}



const reducer = produce((state: KanbanItemState = initialState, action: KanbanActions) => {
    switch (action.type) {
        
        case KanbanActionTypes.KANBAN_ITEM_REQUEST_SEND:
            state.loading = true;
            return state;
        case KanbanActionTypes.KANBAN_ITEM_SUCCESS:
            state.loading = false;
            state.kanban = action.payload;
            return state;
        case KanbanActionTypes.KANBAN_ITEM_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
    
        case KanbanActionTypes.KANBAN_STATUS_ADD:
            state.kanban?.setStatuses([...state.kanban.getStatuses(), action.payload])
            console.log(state.kanban)
            return {...state};
        case KanbanActionTypes.KANBAN_STATUS_UPDATE:
            state.kanban?.setStatuses([...state.kanban.getStatuses().filter((status) => status.getId() != action.payload.getId()), action.payload])
            return {...state};
        case KanbanActionTypes.KANBAN_STATUS_REMOVE:
            state.kanban?.setStatuses([...state.kanban.getStatuses().filter((status) => status.getId() != action.payload)])
            console.log(state.kanban)
            return {...state};

        case KanbanActionTypes.KANBAN_TASK_ADD:
            let statuses = state.kanban!.getStatuses()
            statuses?.forEach((status) => {
                if (status.getId() == action.payload.statusId) {
                    status.setTasks([...status.getTasks(), action.payload.task])
                }
            })
            state.kanban?.setStatuses([...statuses])
            return {...state};
        case KanbanActionTypes.KANBAN_TASK_UPDATE:
            let statusesList = state.kanban!.getStatuses()
            statusesList?.forEach((status) => {
                if (status.getId() == action.payload.statusId) {
                    status.setTasks([...status.getTasks().filter((task) => task.getId() != action.payload.task.getId()), action.payload.task])
                }
            })
            state.kanban?.setStatuses([...statusesList])
            return {...state};
        case KanbanActionTypes.KANBAN_TASK_REMOVE:
            let statusesL = state.kanban!.getStatuses()
            statusesL?.forEach((status) => {
                if (status.getId() == action.payload.statusId) {
                    status.setTasks([...status.getTasks().filter((task) => task.getId() != action.payload.taskId)])
                }
            })
            state.kanban?.setStatuses([...statusesL])
            return {...state};
    
        default:
            return state;
    }
})

export default reducer;
