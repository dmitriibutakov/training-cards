import {errorUtils} from '../3_commons/errors-utils';
import {AxiosError} from 'axios';
import {setIsFetching, SetIsFetchingType} from '../3_commons/common_actions/common_actions';
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
            return {...state, errorOfResponse: action.errorOfResponse}
        case "SET-PROFILE":
            return {...state, profile: action.profile}
        case "SET-INIT":
            return {...state, isInit: action.init}
        case "SET-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-RESPONSE":
            return {...state, isResponse: action.response}
        default:
            return state
    }
};

//types
export type AppReducerType = SetAppErrorType
    | SetProfileDataType
    | SetIsInitType
    | SetIsFetchingType
    | SetResponseType
export type SetAppErrorType = ReturnType<typeof setAppError>
type SetProfileDataType = ReturnType<typeof setProfileData>
type SetIsInitType = ReturnType<typeof setIsInit>
type SetResponseType = ReturnType<typeof setResponse>

//actions
export const setAppError = (errorOfResponse: string | null) => ({type: 'SET-ERROR', errorOfResponse} as const)
export const setProfileData = (profile: ResponseDataProfileType) => ({type: 'SET-PROFILE', profile} as const)
const setIsInit = (init: boolean) => ({type: 'SET-INIT', init} as const)
export const setResponse = (response: boolean) => ({type: "SET-RESPONSE", response} as const)

//thunks
export const initAppTC = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.me()
        dispatch(setProfileData(response.data))
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
        dispatch(setProfileData(response.data.updatedUser))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export default appReducer;