import {SetIsFetchingType} from "../3_commons/common_actions/common_actions";

type AuthStateType = {
    isLoggedIn: boolean
    isFetching: boolean
}

let initialState: AuthStateType = {
    isLoggedIn: false,
    isFetching: false
}

const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-LOGIN":
            return {...state, ...action.payload}
        default:
            return state
    }
};

export type AuthReducerType = ReturnType<typeof setIsLogin> | SetIsFetchingType


const setIsLogin = (isLoggedIn: boolean) => ({type: "SET-IS-LOGIN", payload: {isLoggedIn}} as const)

export default AuthReducer;