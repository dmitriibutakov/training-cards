import {applyMiddleware, combineReducers, legacy_createStore } from "redux";
import AppReducer, {AppReducerType} from "./app-reducer";
import AuthReducer, {AuthReducerType} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>
export default store;

export type AppReducersTypes = AppReducerType | AuthReducerType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppReducersTypes>