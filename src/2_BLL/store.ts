import {applyMiddleware, combineReducers, legacy_createStore } from "redux";
import appReducer, {AppReducerType} from "./app-reducer";
import authReducer, {AuthReducerType} from "./auth-reducer";

import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>
export default store;

type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, AppReducersTypes>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppReducersTypes = AppReducerType | AuthReducerType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppReducersTypes>