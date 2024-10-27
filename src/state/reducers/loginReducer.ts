import { LoginActionTypes } from "../action-types";
import { LoginActions } from "../actions";
import produce from 'immer';


interface LoginState {
    loading: boolean | undefined;
    result: boolean | null,
    authorized: boolean,
    error: string | null,
}

const initialState: LoginState = {
    loading: undefined,
    result: null,
    authorized: false,
    error: null,
}



const reducer = produce((state: LoginState = initialState, action: LoginActions) => {
    switch (action.type) {
        case LoginActionTypes.LOGIN_REQUEST_SEND:
            state.loading = true;
            return state;
        case LoginActionTypes.LOGIN_SUCCESS:
            state = {
                loading: false,
                result: true,
                error: null,
                authorized: true,
            }
            return state;
        case LoginActionTypes.LOGIN_ERROR:
            state = {
                loading: false,
                result: false,
                error: action.payload,
                authorized: false,
            }
            return state;
        default:
            return state;
    }
})

export default reducer;