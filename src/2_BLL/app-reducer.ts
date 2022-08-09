import {errorUtils} from '../3_commons/errors-utils';
import {AxiosError} from 'axios';
import {setIsFetching} from '../3_commons/common_actions/common_actions';
import {AppThunk} from './store';
import {authApi, ResponseDataProfileType} from '../1_DAL/auth-api';
import {setIsLogin} from "./auth-reducer";
import {numberInit, stringInit} from "../3_commons/init-variables";

export type AppType = {
    errorOfResponse: string | null
    profile: ResponseDataProfileType
    isInit: boolean
    userId: string
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
    userId: stringInit
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
            return {...state, errorOfResponse: action.errorOfResponse}
        case "SET-PROFILE":
            return {...state, profile: action.profile}
        case "SET-INIT":
            return {...state, isInit: action.init}
        case "SET-ID":
            return {...state, userId: action.userId}
        default:
            return state
    }
};

//types
export type AppReducerType = SetAppErrorType | SetProfileDataType | SetIsInitType | SetUserIdType
export type SetAppErrorType = ReturnType<typeof setAppError>
type SetProfileDataType = ReturnType<typeof setProfileData>
type SetIsInitType = ReturnType<typeof setIsInit>
type SetUserIdType = ReturnType<typeof setUserId>

//actions
export const setAppError = (errorOfResponse: string | null) => ({type: 'SET-ERROR', errorOfResponse} as const)
export const setProfileData = (profile: ResponseDataProfileType) => ({type: 'SET-PROFILE', profile} as const)
const setIsInit = (init: boolean) => ({type: 'SET-INIT', init} as const)
const setUserId = (userId: string) => ({type: "SET-ID", userId} as const)

//thunks
export const editProfileTC = (name: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.editProfile(name)
        console.log(response)
        dispatch(setProfileData(response.data.updatedUser))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const initAppTC = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setIsFetching(true))
        const response = await authApi.me()
        console.log(response.data)
        dispatch(setProfileData(response.data))
        dispatch(setUserId(response.data._id))
        dispatch(setIsLogin(true))
    } catch (err) {
        const {isLoggedIn} = getState().auth
        if (isLoggedIn) {
            errorUtils(err as Error | AxiosError, dispatch)
        }
    } finally {
        dispatch(setIsInit(true));
        dispatch(setIsFetching(false))
    }
};

export default appReducer;