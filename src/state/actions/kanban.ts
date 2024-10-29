import { Kanban } from "../../domain/kanban"
import { Status } from "../../domain/status"
import { Task } from "../../domain/task"
import { KanbanActionTypes } from "../action-types"

export interface KanbanListRequestSend {
    type: KanbanActionTypes.KANBAN_REQUEST_SEND,
}

export interface KanbanListSuccess {
    type: KanbanActionTypes.KANBAN_SUCCESS,
    payload: Kanban[]
}

export interface KanbanListError {
    type: KanbanActionTypes.KANBAN_ERROR,
    payload: string,
}

export interface KanbanItemRequestSend {
    type: KanbanActionTypes.KANBAN_ITEM_REQUEST_SEND,
}

export interface KanbanItemSuccess {
    type: KanbanActionTypes.KANBAN_ITEM_SUCCESS,
    payload: Kanban
}

export interface KanbanItemError {
    type: KanbanActionTypes.KANBAN_ITEM_ERROR,
    payload: string,
}

export interface KanbanStatusAdd {
    type: KanbanActionTypes.KANBAN_STATUS_ADD,
    payload: Status
}

export interface KanbanTaskAdd {
    type: KanbanActionTypes.KANBAN_TASK_ADD,
    payload:  {task: Task, statusId: number}
}

export interface KanbanStatusUpdate {
    type: KanbanActionTypes.KANBAN_STATUS_UPDATE,
    payload: Status
}

export interface KanbanTaskUpdate {
    type: KanbanActionTypes.KANBAN_TASK_UPDATE,
    payload: {task: Task, statusId: number}
}

export interface KanbanStatusRemove {
    type: KanbanActionTypes.KANBAN_STATUS_REMOVE,
    payload: number
}

export interface KanbanTaskRemove {
    type: KanbanActionTypes.KANBAN_TASK_REMOVE,
    payload: {taskId: number, statusId: number}
}

export interface KanbanTaskStatusChanged {
    type: KanbanActionTypes.KANBAN_TASK_STATUS_CHANGED,
    payload: {taskId: number, oldStatusId: number, newStatusId: number}
}


export interface KanbanCreateRequest {
    type: KanbanActionTypes.KANBAN_CREATE_REQUEST,
}

export interface KanbanCreateSuccess {
    type: KanbanActionTypes.KANBAN_CREATE_SUCCESS,
    payload: Kanban,
}

export interface KanbanCreateError {
    type: KanbanActionTypes.KANBAN_CREATE_ERROR,
    payload: string,
}

export interface KanbanUpdateRequest {
    type: KanbanActionTypes.KANBAN_UPDATE_REQUEST,
}

export interface KanbanUpdateSuccess {
    type: KanbanActionTypes.KANBAN_UPDATE_SUCCESS,
    payload: Kanban,
}

export interface KanbanUpdateError {
    type: KanbanActionTypes.KANBAN_UPDATE_ERROR,
    payload: string,
}


export interface KanbanDeleteRequest {
    type: KanbanActionTypes.KANBAN_DELETE_REQUEST,
}

export interface KanbanDeleteSuccess {
    type: KanbanActionTypes.KANBAN_DELETE_SUCCESS,
    payload: number,
}

export interface KanbanDeleteError {
    type: KanbanActionTypes.KANBAN_DELETE_ERROR,
    payload: string,
}



export type KanbanActions = 
 | KanbanListRequestSend
 | KanbanListSuccess
 | KanbanListError
 | KanbanItemRequestSend
 | KanbanItemSuccess
 | KanbanItemError
 | KanbanStatusAdd
 | KanbanTaskAdd
 | KanbanStatusUpdate
 | KanbanTaskUpdate
 | KanbanStatusRemove
 | KanbanTaskRemove
 | KanbanTaskStatusChanged
 | KanbanCreateRequest
 | KanbanCreateSuccess
 | KanbanCreateError
 | KanbanUpdateRequest
 | KanbanUpdateSuccess
 | KanbanUpdateError
 | KanbanDeleteRequest
 | KanbanDeleteSuccess
 | KanbanDeleteError
