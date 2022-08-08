import {errorUtils} from '../3_commons/errors-utils';
import {AxiosError} from 'axios';
import {setIsFetching} from '../3_commons/common_actions/common_actions';
import {AppThunk} from './store';
import {AuthAPI, ResponseDataProfileType} from '../1_DAL/Api';
import {setIsLogin} from "./auth-reducer";

export type AppType = {
    errorOfResponse: string | null
    profile: ResponseDataProfileType
    isInit: boolean
}

let initialState: AppType = {
    errorOfResponse: null,
    profile: {
        created: "",
        email: "",
        name: "",
        isAdmin: false,
        publicCardPacksCount: 0,
        rememberMe: false,
        verified: false,
        _id: "",
    },
    isInit: false
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
            return {...state, errorOfResponse: action.errorOfResponse}
        case "SET-PROFILE":
            return {...state, profile: action.profile}
        case "SET-INIT":
            return {...state, isInit: action.init}
        default:
            return state
    }
};

export type AppReducerType = SetAppErrorType | SetProfileDataType | SetIsInitType
export type SetAppErrorType = ReturnType<typeof setAppError>
type SetProfileDataType = ReturnType<typeof setProfileData>
type SetIsInitType = ReturnType<typeof setIsInit>

//actions
export const setAppError = (errorOfResponse: string | null) => ({type: 'SET-ERROR', errorOfResponse} as const)
export const setProfileData = (profile: ResponseDataProfileType) => ({type: 'SET-PROFILE', profile} as const)
const setIsInit = (init: boolean) => ({type: 'SET-INIT', init} as const)

//thunks
export const editProfileTC = (name: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await AuthAPI.editProfile(name)
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
        const response = await AuthAPI.me()
        console.log(response.data)
        dispatch(setProfileData(response.data))
        dispatch(setIsLogin(true))
    }
    catch (err) {
        const {isLoggedIn} = getState().auth
        if (isLoggedIn) {
            errorUtils(err as Error | AxiosError, dispatch)
        }
    }
    finally {
        dispatch(setIsInit(true));
        dispatch(setIsFetching(false))
    }
};

export default appReducer;