import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userReducer from './user';
import kanbanReducer from './kanban';
import kanbanItemReducer from './kanban_item';
import statusReducer from './status';
import taskReducer from './task';

const reducers = combineReducers({
    login: loginReducer,
    user: userReducer,
    kanban: kanbanReducer,
    kanbanItem: kanbanItemReducer,
    status: statusReducer,
    task: taskReducer,
})

export default reducers;
export type RootState = ReturnType<typeof reducers>;