import { errorUtils } from '../3_commons/errors-utils';
import { AxiosError } from 'axios';
import { setIsFetching } from '../3_commons/common_actions/common_actions';
import { AppThunk } from './store';
import { ResponseDataType, AuthAPI } from '../1_DAL/Api';

export type AppType = {
    errorOfResponse: string | null
    profile: ResponseDataType
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
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
            return { ...state, errorOfResponse: action.errorOfResponse }
        case "SET-PROFILE":
            return { ...state, profile: action.profile }
        case "EDIT-PROFILE":
            return { ...state, profile: {...state.profile, name: action.name} }
        default:
            return state
    }
};

export type AppReducerType = SetAppErrorActionType | SetProfileActionType | editProfileActionType
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetProfileActionType = ReturnType<typeof setProfile>
export type editProfileActionType = ReturnType<typeof editProfile>
export const setAppError = (errorOfResponse: string | null) => ({ type: 'SET-ERROR', errorOfResponse } as const)
export const setProfile = (profile: ResponseDataType) => ({ type: 'SET-PROFILE', profile } as const)
export const editProfile = (name: string) => ({ type: 'EDIT-PROFILE', name } as const)

export const editProfileTC = (name: string): AppThunk => (dispatch) => {
    dispatch(setIsFetching(true))
    AuthAPI.editProfile(name)
        .then(res => {
            console.log(res);
            
            dispatch(setProfile(res.data.updatedUser))
            dispatch(setIsFetching(false))
        })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
}

export default appReducer;