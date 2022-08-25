import authReducer, {setIsLogin} from "../2_BLL/auth-reducer";

test("should be change after sign-in request",()=>{
    const state = {
        isLoggedIn: false
    }
    const action = setIsLogin(true)
    const editedState = authReducer(state, action)
    expect(state.isLoggedIn).toBeFalsy()
    expect(editedState.isLoggedIn).toBeTruthy()
})