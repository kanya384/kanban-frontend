import { Dispatch } from "react"
import { StatusActionTypes } from "../action-types";
import { StatusActions } from "../actions"
import { Status } from "../../domain/status";

export const SendStatusListRequest = () => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_REQUEST_SEND,
          });
    }
}

export const StatusListSuccess = (list: Status[]) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_SUCCESS,
            payload: list,
        });
    }
}

export const StatusListError = (error:string) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_ERROR,
            payload: error,
        });
    }
}

export const StatusCreateRequest = () => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_CREATE_REQUEST,
          });
    }
}

export const StatusCreateSuccess = (user: Status) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_CREATE_SUCCESS,
            payload: user,
          });
    }
}

export const StatusCreateError = (message: string) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_CREATE_ERROR,
            payload: message,
          });
    }
}


export const StatusUpdateRequest = () => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_UPDATE_REQUEST,
          });
    }
}

export const StatusUpdateSuccess = (category: Status) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_UPDATE_SUCCESS,
            payload: category,
          });
    }
}

export const StatusUpdateError = (message: string) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_UPDATE_ERROR,
            payload: message,
          });
    }
}


export const StatusDeleteRequest = () => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_DELETE_REQUEST,
          });
    }
}

export const StatusDeleteSuccess = (id: number) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_DELETE_SUCCESS,
            payload: id,
          });
    }
}

export const StatusDeleteError = (message: string) => {
    return async (dispatch: Dispatch<StatusActions>) => {
        dispatch({
            type: StatusActionTypes.STATUS_DELETE_ERROR,
            payload: message,
          });
    }
}