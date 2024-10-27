import { LoginActionTypes } from "../action-types";

export interface LoginRequestSend {
    type: LoginActionTypes.LOGIN_REQUEST_SEND,
}

export interface LoginSuccess {
    type: LoginActionTypes.LOGIN_SUCCESS,
}

export interface LoginError {
    type: LoginActionTypes.LOGIN_ERROR,
    payload: string,
}

export type LoginActions = 
 | LoginRequestSend
 | LoginSuccess
 | LoginError