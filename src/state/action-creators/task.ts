import { Dispatch } from "react"
import { TaskActionTypes } from "../action-types";
import { TaskActions } from "../actions"
import { Task } from "../../domain/task";

export const SendTaskListRequest = () => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_REQUEST_SEND,
          });
    }
}

export const TaskListSuccess = (list: Task[]) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_SUCCESS,
            payload: list,
        });
    }
}

export const TaskListError = (error:string) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_ERROR,
            payload: error,
        });
    }
}

export const TaskCreateRequest = () => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_CREATE_REQUEST,
          });
    }
}

export const TaskCreateSuccess = (user: Task) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_CREATE_SUCCESS,
            payload: user,
          });
    }
}

export const TaskCreateError = (message: string) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_CREATE_ERROR,
            payload: message,
          });
    }
}


export const TaskUpdateRequest = () => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_UPDATE_REQUEST,
          });
    }
}

export const TaskUpdateSuccess = (category: Task) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_UPDATE_SUCCESS,
            payload: category,
          });
    }
}

export const TaskUpdateError = (message: string) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_UPDATE_ERROR,
            payload: message,
          });
    }
}


export const TaskDeleteRequest = () => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_DELETE_REQUEST,
          });
    }
}

export const TaskDeleteSuccess = (id: number) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_DELETE_SUCCESS,
            payload: id,
          });
    }
}

export const TaskDeleteError = (message: string) => {
    return async (dispatch: Dispatch<TaskActions>) => {
        dispatch({
            type: TaskActionTypes.TASK_DELETE_ERROR,
            payload: message,
          });
    }
}