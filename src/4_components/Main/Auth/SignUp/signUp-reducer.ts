import {setIsFetching, SetIsFetchingType} from "../../../../3_commons/common_actions/common_actions";
import {AuthAPI} from "../../../../1_DAL/Api";
import {Dispatch} from "redux";
import {AppThunk} from "../../../../2_BLL/store";
import {AxiosError} from "axios";

type SignUpStateType = {}

let initialState: SignUpStateType = {}

const SignUpReducer = (state: SignUpStateType = initialState, action: SignUpReducerType): SignUpStateType => {
    switch (action.type) {
        default:
            return state
    }
};

export type SignUpReducerType = any

export const signUpTC = (email: string, password: string, repeatPassword: string): AppThunk => (dispatch) => {
    dispatch(setIsFetching(true))
    AuthAPI.signUp(email, password).then(res => {
        console.log(res)
        dispatch(setIsFetching(false))
    })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            console.log('error: ', error)
        })
}

export default SignUpReducer;