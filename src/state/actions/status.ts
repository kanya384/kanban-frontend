import { Status } from "../../domain/status"
import { StatusActionTypes } from "../action-types"

export interface StatusListRequestSend {
    type: StatusActionTypes.STATUS_REQUEST_SEND,
}

export interface StatusListSuccess {
    type: StatusActionTypes.STATUS_SUCCESS,
    payload: Status[]
}

export interface StatusListError {
    type: StatusActionTypes.STATUS_ERROR,
    payload: string,
}


export interface StatusCreateRequest {
    type: StatusActionTypes.STATUS_CREATE_REQUEST,
}

export interface StatusCreateSuccess {
    type: StatusActionTypes.STATUS_CREATE_SUCCESS,
    payload: Status,
}

export interface StatusCreateError {
    type: StatusActionTypes.STATUS_CREATE_ERROR,
    payload: string,
}

export interface StatusUpdateRequest {
    type: StatusActionTypes.STATUS_UPDATE_REQUEST,
}

export interface StatusUpdateSuccess {
    type: StatusActionTypes.STATUS_UPDATE_SUCCESS,
    payload: Status,
}

export interface StatusUpdateError {
    type: StatusActionTypes.STATUS_UPDATE_ERROR,
    payload: string,
}


export interface StatusDeleteRequest {
    type: StatusActionTypes.STATUS_DELETE_REQUEST,
}

export interface StatusDeleteSuccess {
    type: StatusActionTypes.STATUS_DELETE_SUCCESS,
    payload: number,
}

export interface StatusDeleteError {
    type: StatusActionTypes.STATUS_DELETE_ERROR,
    payload: string,
}



export type StatusActions = 
 | StatusListRequestSend
 | StatusListSuccess
 | StatusListError
 | StatusCreateRequest
 | StatusCreateSuccess
 | StatusCreateError
 | StatusUpdateRequest
 | StatusUpdateSuccess
 | StatusUpdateError
 | StatusDeleteRequest
 | StatusDeleteSuccess
 | StatusDeleteError
