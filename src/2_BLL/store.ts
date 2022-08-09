import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import appReducer, {AppReducerType} from "./app-reducer";
import authReducer, {AuthReducerType} from "./auth-reducer";

import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {packsReducer, PacksReducerType} from "./packs-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>

export type AppReducersTypes = AppReducerType | AuthReducerType | PacksReducerType
type RootStateType = ReturnType<typeof store.getState>
type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppReducersTypes>

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppReducersTypes>

export default store;