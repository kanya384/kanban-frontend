export enum KanbanActionTypes {
    KANBAN_REQUEST_SEND = 'kanban_request_send',
    KANBAN_ERROR = 'kanban_kanban_error',
    KANBAN_SUCCESS = 'kanban_success',

    KANBAN_ITEM_REQUEST_SEND = 'kanban_item_request_send',
    KANBAN_ITEM_ERROR = 'kanban_item_kanban_error',
    KANBAN_ITEM_SUCCESS = 'kanban_item_success',

    KANBAN_STATUS_ADD = "kanban_status_add",
    KANBAN_TASK_ADD = "kanban_task_add",

    KANBAN_STATUS_UPDATE = "kanban_status_update",
    KANBAN_TASK_UPDATE = "kanban_task_update",

    KANBAN_STATUS_REMOVE = "kanban_status_remove",
    KANBAN_TASK_REMOVE = "kanban_task_remove",
    
    KANBAN_CREATE_REQUEST = 'kanban_create_request',
    KANBAN_CREATE_SUCCESS = 'kanban_create_success',
    KANBAN_CREATE_ERROR = 'kanban_create_error',

    KANBAN_DELETE_REQUEST = 'kanban_delete_request',
    KANBAN_DELETE_SUCCESS = 'kanban_delete_success',
    KANBAN_DELETE_ERROR = 'kanban_delete_error',

    KANBAN_UPDATE_REQUEST = 'kanban_update_request',
    KANBAN_UPDATE_SUCCESS = 'kanban_update_success',
    KANBAN_UPDATE_ERROR = 'kanban_update_error',
}