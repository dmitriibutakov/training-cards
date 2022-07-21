import {SetIsFetchingType} from "../3_commons/common_actions/common_actions";

type AuthStateType = {
    isAuth: boolean
    isFetching: boolean
}

let initialState: AuthStateType = {
    isAuth: false,
    isFetching: false
}

 const AuthReducer = (state: AuthStateType = initialState, action: AuthReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-AUTH":
            return {...state, ...action.payload}
        case "SET-IS-FETCHING":
            return {...state, ...action.payload}
        default:
            return state
    }
};

export type AuthReducerType = ReturnType<typeof setIsAuth> | SetIsFetchingType


const setIsAuth = (isAuth: boolean) => ({type: "SET-IS-AUTH", payload:{isAuth}} as const)

export default AuthReducer;