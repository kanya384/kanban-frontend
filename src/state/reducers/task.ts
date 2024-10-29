import { Task } from "../../domain/task";
import { TaskActionTypes } from "../action-types";
import { TaskActions } from "../actions";
import produce from 'immer';


interface TaskState {
    loading: boolean | null;
    tasks: Task[] | null,
    error: string | null,
    entityLoading: boolean,
    entityError: string | null,
}

const initialState: TaskState = {
    loading: null,
    tasks: null,
    error: null,
    entityLoading: false,
    entityError: null,
}



const reducer = produce((state: TaskState = initialState, action: TaskActions) => {
    switch (action.type) {
        case TaskActionTypes.TASK_REQUEST_SEND:
            state.loading = true;
            return state;
        case TaskActionTypes.TASK_SUCCESS:
            state.loading = false;
            state.tasks = action.payload;
            return state;
        case TaskActionTypes.TASK_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        case TaskActionTypes.TASK_CREATE_REQUEST:
            state.entityLoading = true
            state.entityError = ""
            return state;
        case TaskActionTypes.TASK_CREATE_SUCCESS:
            state.entityLoading = false
            state.tasks!.push(action.payload)
            state.entityError = ""
            return state;
        case TaskActionTypes.TASK_CREATE_ERROR:
            state.entityLoading = false
            state.entityError = action.payload;
            return state;
        case TaskActionTypes.TASK_DELETE_SUCCESS:
            state.tasks = state.tasks!.filter((tasks) => tasks.getId() !== action.payload)
            return state;
        default:
            return state;
    }
})

export default reducer;
