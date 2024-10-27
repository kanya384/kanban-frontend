import { User } from "../../domain/user/user";
import { UserActionTypes } from "../action-types";
import { UserActions } from "../actions";
import produce from 'immer';


interface UserState {
    loading: boolean | null;
    users: User[] | null,
    error: string | null,
    entityLoading: boolean,
    entityError: string | null,
}

const initialState: UserState = {
    loading: null,
    users: null,
    error: null,
    entityLoading: false,
    entityError: null,
}



const reducer = produce((state: UserState = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.USER_REQUEST_SEND:
            state.loading = true;
            return state;
        case UserActionTypes.USER_SUCCESS:
            state.loading = false;
            state.users = action.payload;
            return state;
        case UserActionTypes.USER_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        case UserActionTypes.USER_CREATE_REQUEST:
            state.entityLoading = true
            state.entityError = ""
            return state;
        case UserActionTypes.USER_CREATE_SUCCESS:
            state.entityLoading = false
            state.users!.push(action.payload)
            state.entityError = ""
            return state;
        case UserActionTypes.USER_CREATE_ERROR:
            state.entityLoading = false
            state.entityError = action.payload;
            return state;
        case UserActionTypes.USER_DELETE_SUCCESS:
            state.users = state.users!.filter((users) => users.Id() !== action.payload)
            return state;
        default:
            return state;
    }
})

export default reducer;
