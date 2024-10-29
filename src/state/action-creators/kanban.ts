import { Dispatch } from "react"
import { KanbanActionTypes } from "../action-types";
import { KanbanActions } from "../actions"
import { Kanban } from "../../domain/kanban";
import { Status } from "../../domain/status";
import { Task } from "../../domain/task";

export const SendKanbanListRequest = () => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_REQUEST_SEND,
          });
    }
}

export const KanbanListSuccess = (list: Kanban[]) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_SUCCESS,
            payload: list,
        });
    }
}

export const KanbanListError = (error:string) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_ERROR,
            payload: error,
        });
    }
}

export const SendKanbanItemRequest = () => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_ITEM_REQUEST_SEND,
          });
    }
}

export const KanbanItemSuccess = (item: Kanban) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_ITEM_SUCCESS,
            payload: item,
        });
    }
}

export const KanbanItemError = (error:string) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_ITEM_ERROR,
            payload: error,
        });
    }
}

export const KanbanStatusAdd = (status: Status) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_STATUS_ADD,
            payload: status,
        });
    }
}

export const KanbanTaskAdd = (task: Task, statusId: number) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_TASK_ADD,
            payload: {task, statusId},
        });
    }
}

export const KanbanStatusUpdate = (status: Status) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_STATUS_UPDATE,
            payload: status,
        });
    }
}

export const KanbanTaskUpdate = (task: Task, statusId: number) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_TASK_UPDATE,
            payload: {task, statusId},
        });
    }
}

export const KanbanStatusRemove = (statusId: number) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_STATUS_REMOVE,
            payload: statusId,
        });
    }
}

export const KanbanTaskRemove = (taskId: number, statusId: number) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_TASK_REMOVE,
            payload: {taskId, statusId},
        });
    }
}


export const KanbanTaskStatusChanged = (taskId: number, oldStatusId: number, newStatusId: number) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_TASK_STATUS_CHANGED,
            payload: {taskId, oldStatusId, newStatusId},
        });
    }
}

export const KanbanCreateRequest = () => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_CREATE_REQUEST,
          });
    }
}

export const KanbanCreateSuccess = (user: Kanban) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_CREATE_SUCCESS,
            payload: user,
          });
    }
}

export const KanbanCreateError = (message: string) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_CREATE_ERROR,
            payload: message,
          });
    }
}


export const KanbanUpdateRequest = () => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_UPDATE_REQUEST,
          });
    }
}

export const KanbanUpdateSuccess = (category: Kanban) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_UPDATE_SUCCESS,
            payload: category,
          });
    }
}

export const KanbanUpdateError = (message: string) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_UPDATE_ERROR,
            payload: message,
          });
    }
}


export const KanbanDeleteRequest = () => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_DELETE_REQUEST,
          });
    }
}

export const KanbanDeleteSuccess = (id: number) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_DELETE_SUCCESS,
            payload: id,
          });
    }
}

export const KanbanDeleteError = (message: string) => {
    return async (dispatch: Dispatch<KanbanActions>) => {
        dispatch({
            type: KanbanActionTypes.KANBAN_DELETE_ERROR,
            payload: message,
          });
    }
}