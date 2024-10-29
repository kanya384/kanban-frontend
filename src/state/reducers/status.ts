import { Status } from "../../domain/status";
import { StatusActionTypes } from "../action-types";
import { StatusActions } from "../actions";
import produce from 'immer';


interface StatusState {
    loading: boolean | null;
    statuses: Status[] | null,
    error: string | null,
    entityLoading: boolean,
    entityError: string | null,
}

const initialState: StatusState = {
    loading: null,
    statuses: null,
    error: null,
    entityLoading: false,
    entityError: null,
}



const reducer = produce((state: StatusState = initialState, action: StatusActions) => {
    switch (action.type) {
        case StatusActionTypes.STATUS_REQUEST_SEND:
            state.loading = true;
            return state;
        case StatusActionTypes.STATUS_SUCCESS:
            state.loading = false;
            state.statuses = action.payload;
            return state;
        case StatusActionTypes.STATUS_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        case StatusActionTypes.STATUS_CREATE_REQUEST:
            state.entityLoading = true
            state.entityError = ""
            return state;
        case StatusActionTypes.STATUS_CREATE_SUCCESS:
            state.entityLoading = false
            state.statuses!.push(action.payload)
            state.entityError = ""
            return state;
        case StatusActionTypes.STATUS_CREATE_ERROR:
            state.entityLoading = false
            state.entityError = action.payload;
            return state;
        case StatusActionTypes.STATUS_DELETE_SUCCESS:
            state.statuses = state.statuses!.filter((status) => status.getId() !== action.payload)
            return state;
        default:
            return state;
    }
})

export default reducer;
