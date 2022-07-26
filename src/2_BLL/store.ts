import {applyMiddleware, combineReducers, legacy_createStore } from "redux";
import AppReducer, {AppReducerType} from "./app-reducer";
import AuthReducer, {AuthReducerType} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";

import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import signUpReducer, {SignUpReducerType} from "../4_components/Main/Auth/SignUp/signUp-reducer";
import {AutActionsType, authReducer} from "../4_components/Main/Auth/SignIn/singIn-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>
export default store;

type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, AppReducersTypes>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppReducersTypes = AppReducerType | AutActionsType | SignUpReducerType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppReducersTypes>