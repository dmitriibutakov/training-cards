import {setIsFetching, SetIsFetchingType} from "../../../../3_commons/common_actions/common_actions";
import {AuthAPI} from "../../../../1_DAL/Api";
import {AppThunk} from "../../../../2_BLL/store";

type SignUpStateType = {
}

let initialState: SignUpStateType = {
}

const SignUpReducer = (state: SignUpStateType = initialState, action: SignUpReducerType): SignUpStateType => {
    switch (action.type) {
        default:
            return state
    }
};

export type SignUpReducerType = SetIsFetchingType


export const signUpTC = (email: string, password: string, repeatPassword: string): AppThunk => async dispatch => {
    dispatch(setIsFetching(true))
    await AuthAPI.signUp(email, password).then(res => {
        console.log(res)
    })
}

export default SignUpReducer;