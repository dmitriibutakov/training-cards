import {setIsFetching, SetIsFetchingType} from "../3_commons/common_actions/common_actions";
import {AppThunk} from "./store";
import {authApi, LoginParamsType} from "../1_DAL/auth-api";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";
import {setProfile, setResponse} from "./app-reducer";
import {getPacksTC} from "./packs-reducer";

export type AuthStateType = {
    isLoggedIn: boolean
}

let initialState: AuthStateType = {
    isLoggedIn: false,
}

const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
};

//types
export type AuthReducerType = ReturnType<typeof setIsLogin> | SetIsFetchingType

//actions
export const setIsLogin = (isLoggedIn: boolean) => ({type: "SET-IS-LOGIN", isLoggedIn} as const)

//thunks
export const signUpTC = (email: string, password: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        await authApi.signUp(email, password)
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const signInTC = (data: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.signIn(data)
        dispatch(setProfile(response.data))
        await dispatch(getPacksTC())
        dispatch(setIsLogin(true))
        dispatch(setIsFetching(false))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const resetPasswordTC = (email: string): AppThunk => async dispatch => {
    dispatch(setResponse(false))
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.resetPassword(email)
        dispatch(setResponse(!!response))
        dispatch(setIsFetching(false))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const logoutTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        await authApi.logOut()
        dispatch(setIsLogin(false))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const setNewPasswordTC = (password: string, resetPasswordToken: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        await authApi.setNewPassword(password, resetPasswordToken);
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
};

export default AuthReducer;