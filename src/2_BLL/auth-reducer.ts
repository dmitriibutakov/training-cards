import {setIsFetching, SetIsFetchingType} from "../3_commons/common_actions/common_actions";
import {AppThunk} from "./store";
import {AuthAPI} from "../1_DAL/Api";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";

export type AuthStateType = {
    isLoggedIn: boolean
    isFetching: boolean
}

let initialState: AuthStateType = {
    isLoggedIn: false,
    isFetching: false,
}

const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, ...action.payload}
        case "SET-IS-FETCHING":
            return {...state, ...action.payload}
        default:
            return state
    }
};

export type AuthReducerType = SetIsLogin | SetIsFetchingType

type SetIsLogin = ReturnType<typeof setIsLoginAC>

const setIsLoginAC = (isLoggedIn: boolean) => ({type: "SET-IS-LOGIN", payload: {isLoggedIn}} as const)

export const signUpTC = (email: string, password: string): AppThunk => (dispatch) => {
    dispatch(setIsFetching(true))
    AuthAPI.signUp(email, password)
        .then(res => {
        dispatch(setIsFetching(false))
    })
        .catch((err: AxiosError<{ error: string }>) => errorUtils(err, dispatch))
}


export default AuthReducer;