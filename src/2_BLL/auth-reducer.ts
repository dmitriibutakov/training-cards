import {setIsFetching, SetIsFetchingType} from "../3_commons/common_actions/common_actions";
import {AppThunk} from "./store";
import {AuthAPI, LoginParamsType} from "../1_DAL/Api";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";
import {setProfileData} from "./app-reducer";

export type AuthStateType = {
    isLoggedIn: boolean
    isFetching: boolean
    isResponse: boolean
    buttonDisable: boolean
    info: string | null
    isEmailSent: boolean
}

let initialState: AuthStateType = {
    isLoggedIn: false,
    isFetching: false,
    isResponse: false,
    buttonDisable: true,
    info: null,
    isEmailSent: false
}

const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-RESPONSE":
            return {...state, isResponse: action.response}
        case "SET-INFO":
            return {...state, info: action.info}
        case "SET-EMAIL-SENT":
            return {...state, isEmailSent: action.isEmailSent}

        default:
            return state
    }
};

//types
export type AuthReducerType = SetIsLoginType | SetIsFetchingType | SetResponseType | SetInfoType | SetEmailSendType

type SetIsLoginType = ReturnType<typeof setIsLogin>
type SetResponseType = ReturnType<typeof setResponse>
type SetInfoType = ReturnType<typeof setInfo>
type SetEmailSendType = ReturnType<typeof setEmailSent>

//actions
export const setIsLogin = (isLoggedIn: boolean) => ({type: "SET-IS-LOGIN", isLoggedIn} as const)
const setInfo = (info: string) => ({type: "SET-INFO", info} as const)
const setResponse = (response: boolean) => ({type: "SET-RESPONSE", response} as const)
const setEmailSent = (isEmailSent: boolean) => ({type: "SET-EMAIL-SENT", isEmailSent} as const)

//thunks
export const signUpTC = (email: string, password: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await AuthAPI.signUp(email, password)
        console.log(response)
        dispatch(setResponse(true))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const signInTC = (data: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await AuthAPI.signIn(data)
        console.log(response)
        dispatch(setProfileData(response.data))
        dispatch(setIsLogin(true))
        dispatch(setIsFetching(false))
        dispatch(setResponse(true))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const resetPasswordTC = (email: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await AuthAPI.resetPassword(email)
        console.log(response)
        dispatch(setEmailSent(true))
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
        const response = await AuthAPI.logOut()
        console.log(response)
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
        const response = await AuthAPI.setNewPassword(password, resetPasswordToken);
        console.log(response.data.info)
        dispatch(setInfo(response.data.info));
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
};

export default AuthReducer;