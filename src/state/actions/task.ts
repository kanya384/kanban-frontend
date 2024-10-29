import { Task } from "../../domain/task"
import { TaskActionTypes } from "../action-types"

export interface TaskListRequestSend {
    type: TaskActionTypes.TASK_REQUEST_SEND,
}

export interface TaskListSuccess {
    type: TaskActionTypes.TASK_SUCCESS,
    payload: Task[]
}

export interface TaskListError {
    type: TaskActionTypes.TASK_ERROR,
    payload: string,
}


export interface TaskCreateRequest {
    type: TaskActionTypes.TASK_CREATE_REQUEST,
}

export interface TaskCreateSuccess {
    type: TaskActionTypes.TASK_CREATE_SUCCESS,
    payload: Task,
}

export interface TaskCreateError {
    type: TaskActionTypes.TASK_CREATE_ERROR,
    payload: string,
}

export interface TaskUpdateRequest {
    type: TaskActionTypes.TASK_UPDATE_REQUEST,
}

export interface TaskUpdateSuccess {
    type: TaskActionTypes.TASK_UPDATE_SUCCESS,
    payload: Task,
}

export interface TaskUpdateError {
    type: TaskActionTypes.TASK_UPDATE_ERROR,
    payload: string,
}


export interface TaskDeleteRequest {
    type: TaskActionTypes.TASK_DELETE_REQUEST,
}

export interface TaskDeleteSuccess {
    type: TaskActionTypes.TASK_DELETE_SUCCESS,
    payload: number,
}

export interface TaskDeleteError {
    type: TaskActionTypes.TASK_DELETE_ERROR,
    payload: string,
}



export type TaskActions = 
 | TaskListRequestSend
 | TaskListSuccess
 | TaskListError
 | TaskCreateRequest
 | TaskCreateSuccess
 | TaskCreateError
 | TaskUpdateRequest
 | TaskUpdateSuccess
 | TaskUpdateError
 | TaskDeleteRequest
 | TaskDeleteSuccess
 | TaskDeleteError
