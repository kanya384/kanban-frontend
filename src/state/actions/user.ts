import { User } from "../../domain/user"
import { UserActionTypes } from "../action-types"

export interface UserListRequestSend {
    type: UserActionTypes.USER_REQUEST_SEND,
}

export interface UserListSuccess {
    type: UserActionTypes.USER_SUCCESS,
    payload: User[]
}

export interface UserListError {
    type: UserActionTypes.USER_ERROR,
    payload: string,
}


export interface UserCreateRequest {
    type: UserActionTypes.USER_CREATE_REQUEST,
}

export interface UserCreateSuccess {
    type: UserActionTypes.USER_CREATE_SUCCESS,
    payload: User,
}

export interface UserCreateError {
    type: UserActionTypes.USER_CREATE_ERROR,
    payload: string,
}

export interface UserUpdateRequest {
    type: UserActionTypes.USER_UPDATE_REQUEST,
}

export interface UserUpdateSuccess {
    type: UserActionTypes.USER_UPDATE_SUCCESS,
    payload: User,
}

export interface UserUpdateError {
    type: UserActionTypes.USER_UPDATE_ERROR,
    payload: string,
}


export interface UserDeleteRequest {
    type: UserActionTypes.USER_DELETE_REQUEST,
}

export interface UserDeleteSuccess {
    type: UserActionTypes.USER_DELETE_SUCCESS,
    payload: number,
}

export interface UserDeleteError {
    type: UserActionTypes.USER_DELETE_ERROR,
    payload: string,
}



export type UserActions = 
 | UserListRequestSend
 | UserListSuccess
 | UserListError
 | UserCreateRequest
 | UserCreateSuccess
 | UserCreateError
 | UserUpdateRequest
 | UserUpdateSuccess
 | UserUpdateError
 | UserDeleteRequest
 | UserDeleteSuccess
 | UserDeleteError
