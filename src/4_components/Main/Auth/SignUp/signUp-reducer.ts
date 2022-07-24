import {AppThunk} from "../../../../2_BLL/store";
import {setIsFetching} from "../../../../3_commons/common_actions/common_actions";

type AuthStateType = {
}

let initialState: AuthStateType = {
}

const SignUpReducer = (state: AuthStateType = initialState, action: SignUpReducerType): AuthStateType => {
    switch (action.type) {
        case "SET-IS-AUTH":
            return {...state, ...action.payload}
        default:
            return state
    }
};

export type SignUpReducerType = any

const test = (isAuth: boolean) => ({type: "SET-IS-AUTH", payload:{isAuth}} as const)
export const signUp = (email: string, password: string, repeatPassword: string): AppThunk => async dispatch => {
    await dispatch(setIsFetching(true))
}

export default SignUpReducer;