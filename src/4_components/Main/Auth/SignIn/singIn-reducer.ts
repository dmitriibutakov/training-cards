import React from "react";
import {Dispatch} from "redux";
import {SignUpReducerType} from "../SignUp/signUp-reducer";
import {AuthAPI, LoginParamsType} from "../../../../1_DAL/Api";
import {AxiosError} from "axios";

type AuthStateType = {
    isLoggedIn: boolean
    buttonDisable: boolean
    errors: string | null
}

let initialState: AuthStateType = {
    isLoggedIn: false,
    buttonDisable: false,
    errors: null
}


export const authReducer = (state: AuthStateType = initialState, action: AutActionsType): AuthStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        case "login/BUTTON-DISABLE":
            return {...state, buttonDisable: action.value}
        default:
            return state
    }
};

//action
export const setIsLoggedInAC = (value: boolean) =>
    ({type: "login/SET-IS-LOGGED-IN", value} as const)

export const setIsButtonDisableAC = (value: boolean) =>
    ({type: "login/BUTTON-DISABLE", value} as const)


export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AutActionsType>) => {
    dispatch(setIsButtonDisableAC(true))
    AuthAPI.signIn(data).then(res => {
        console.log(res)
    }).catch((err: AxiosError<{ error: string }>) => {
        const error = err.response
            ? err.response.data.error
            : err.message
        console.log('error: ', error)
    }).finally(() => {
        dispatch(setIsButtonDisableAC(false))
    })

}


//type

export type AutActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsButtonDisableAC>