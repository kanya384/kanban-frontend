import { Dispatch } from "react"
import { LoginActionTypes } from "../action-types";
import { LoginActions } from "../actions"

export const SendLoginRequest = () => {
    return async (dispatch: Dispatch<LoginActions>) => {
        dispatch({
            type: LoginActionTypes.LOGIN_REQUEST_SEND,
          });
    }
}

export const LoginSuccess = () => {
    return async (dispatch: Dispatch<LoginActions>) => {
        dispatch({
            type: LoginActionTypes.LOGIN_SUCCESS,
        });
    }
}

export const LoginError = (error:string) => {
    return async (dispatch: Dispatch<LoginActions>) => {
        dispatch({
            type: LoginActionTypes.LOGIN_ERROR,
            payload: error,
        });
    }
}