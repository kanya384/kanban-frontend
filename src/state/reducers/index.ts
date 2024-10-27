import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userReducer from './user';

const reducers = combineReducers({
    login: loginReducer,
    user: userReducer,
})

export default reducers;
export type RootState = ReturnType<typeof reducers>;