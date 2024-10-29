import { Dispatch } from "react"
import { UserActionTypes } from "../action-types";
import { UserActions } from "../actions"
import { User } from "../../domain/user";

export const SendUserListRequest = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_REQUEST_SEND,
          });
    }
}

export const UserListSuccess = (list: User[]) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_SUCCESS,
            payload: list,
        });
    }
}

export const UserListError = (error:string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_ERROR,
            payload: error,
        });
    }
}

export const UserCreateRequest = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_CREATE_REQUEST,
          });
    }
}

export const UserCreateSuccess = (user: User) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_CREATE_SUCCESS,
            payload: user,
          });
    }
}

export const UserCreateError = (message: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_CREATE_ERROR,
            payload: message,
          });
    }
}


export const UserUpdateRequest = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_UPDATE_REQUEST,
          });
    }
}

export const UserUpdateSuccess = (category: User) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_UPDATE_SUCCESS,
            payload: category,
          });
    }
}

export const UserUpdateError = (message: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_UPDATE_ERROR,
            payload: message,
          });
    }
}


export const UserDeleteRequest = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_DELETE_REQUEST,
          });
    }
}

export const UserDeleteSuccess = (id: number) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_DELETE_SUCCESS,
            payload: id,
          });
    }
}

export const UserDeleteError = (message: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionTypes.USER_DELETE_ERROR,
            payload: message,
          });
    }
}