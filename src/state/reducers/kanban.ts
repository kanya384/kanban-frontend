import { Kanban } from "../../domain/kanban";
import { KanbanActionTypes } from "../action-types";
import { KanbanActions } from "../actions";
import produce from 'immer';


interface KanbanState {
    loading: boolean | null;
    kanbans: Kanban[] | null,
    error: string | null,
    entityLoading: boolean,
    entityError: string | null,
}

const initialState: KanbanState = {
    loading: null,
    kanbans: null,
    error: null,
    entityLoading: false,
    entityError: null,
}



const reducer = produce((state: KanbanState = initialState, action: KanbanActions) => {
    switch (action.type) {
        case KanbanActionTypes.KANBAN_REQUEST_SEND:
            state.loading = true;
            return state;
        case KanbanActionTypes.KANBAN_SUCCESS:
            state.loading = false;
            state.kanbans = action.payload;
            return state;
        case KanbanActionTypes.KANBAN_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        case KanbanActionTypes.KANBAN_CREATE_REQUEST:
            state.entityLoading = true
            state.entityError = ""
            return state;
        case KanbanActionTypes.KANBAN_CREATE_SUCCESS:
            state.entityLoading = false
            state.kanbans!.push(action.payload)
            state.entityError = ""
            return state;
        case KanbanActionTypes.KANBAN_CREATE_ERROR:
            state.entityLoading = false
            state.entityError = action.payload;
            return state;
        case KanbanActionTypes.KANBAN_DELETE_SUCCESS:
            state.kanbans = state.kanbans!.filter((kanbans) => kanbans.getId() !== action.payload)
            return state;
        default:
            return state;
    }
})

export default reducer;
