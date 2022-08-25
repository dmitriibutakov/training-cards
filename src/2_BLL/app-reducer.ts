import {errorUtils} from '../3_commons/errors-utils';
import {AxiosError} from 'axios';
import {setIsFetching, SetIsFetchingType} from '../3_commons/actions/common_actions';
import {AppThunk} from './store';
import {authApi, ResponseDataProfileType} from '../1_DAL/auth-api';
import {setIsLogin} from "./auth-reducer";
import {numberInit, stringInit} from "../3_commons/init-variables";

export type AppType = {
    errorOfResponse: string | null
    profile: ResponseDataProfileType
    isInit: boolean
    isFetching: boolean
    isResponse: boolean
}

let initialState: AppType = {
    errorOfResponse: null,
    profile: {
        created: stringInit,
        email: stringInit,
        name: stringInit,
        isAdmin: false,
        publicCardPacksCount: numberInit,
        rememberMe: false,
        verified: false,
        _id: stringInit,
    },
    isInit: false,
    isFetching: false,
    isResponse: false,
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
        case "SET-PROFILE":
        case "SET-INIT":
        case "SET-IS-FETCHING":
        case "SET-RESPONSE":
            return {...state, ...action}
        default:
            return state
    }
};

//types
export type AppReducerType = SetAppErrorType
    | ReturnType<typeof setProfile>
    | ReturnType<typeof setIsInit>
    | ReturnType<typeof setResponse>
    | SetIsFetchingType
export type SetAppErrorType = ReturnType<typeof setAppError>

//actions
export const setAppError = (errorOfResponse: string | null) => ({type: 'SET-ERROR', errorOfResponse} as const)
export const setProfile = (profile: ResponseDataProfileType) => ({type: 'SET-PROFILE', profile} as const)
export const setResponse = (isResponse: boolean) => ({type: "SET-RESPONSE", isResponse} as const)
export const setIsInit = (isInit: boolean) => ({type: 'SET-INIT', isInit} as const)

//thunks
export const initAppTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.me()
        dispatch(setProfile(response.data))
        dispatch(setIsLogin(true))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsInit(true));
        dispatch(setIsFetching(false))
    }
};

export const editProfileTC = (name: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.editProfile(name)
        dispatch(setProfile(response.data.updatedUser))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export default appReducer;