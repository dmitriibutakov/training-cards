import {setIsFetching, SetIsFetchingType} from "../3_commons/common_actions/common_actions";
import {AppThunk} from "./store";
import {AuthAPI, LoginParamsType} from "../1_DAL/Api";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";
import {Dispatch} from "redux";

export type AuthStateType = {
    isLoggedIn: boolean
    isFetching: boolean
    isResponse: boolean
    buttonDisable: boolean
}

let initialState: AuthStateType = {
    isLoggedIn: false,
    isFetching: false,
    isResponse: false,
    buttonDisable: false
}

const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-RESPONSE":
            return {...state, isResponse: action.response}
        default:
            return state
    }
};

export type AuthReducerType = SetIsLoginType | SetIsFetchingType | SetResponseType | SetButtonDisableType

type SetIsLoginType = ReturnType<typeof setIsLogin>
type SetResponseType = ReturnType<typeof setResponse>
type SetButtonDisableType = ReturnType<typeof setButtonDisable>

const setIsLogin = (isLoggedIn: boolean) => ({type: "SET-IS-LOGIN", isLoggedIn} as const)
const setResponse = (response: boolean) => ({type: "SET-RESPONSE", response} as const)
const setButtonDisable = (buttonDisable: boolean) => ({type: "SET-BTN-DISABLE", buttonDisable} as const)

export const signUpTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(setButtonDisable(true))
    dispatch(setIsFetching(true))
    AuthAPI.signUp(email, password)
        .then(res => {
            dispatch(setIsFetching(false))
            dispatch(setResponse(true))
        })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
        .finally(() => dispatch(setButtonDisable(false)))
}

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch: Dispatch<AuthReducerType>) => {
    dispatch(setButtonDisable(true))
    AuthAPI.signIn(data).then(res => {
        console.log(res)
    })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
        .finally(() => {
            dispatch(setButtonDisable(false))
        })

}

export default AuthReducer;