import {numberInit, stringInit} from "../3_commons/init-variables";
import appReducer, {
    AppReducerType,
    AppType,
    setAppError,
    setIsInit,
    setResponse
} from "../2_BLL/app-reducer";
import {setIsFetching} from "../3_commons/actions/common_actions";

const initialState: AppType = {
    errorOfResponse: null,
    profile: {
        created: stringInit,
        email: stringInit,
        name: stringInit,
        isAdmin: false,
        publicCardPacksCount: numberInit,
        rememberMe: false,
        verified: false,
        _id: stringInit,
    },
    isInit: false,
    isFetching: false,
    isResponse: false,
}
test("isInit, isResponse, isFetching should be changed", ()=> {
    const fooTest = (actionCreator: AppReducerType) => {
        return appReducer(initialState, actionCreator);
    }
    expect(initialState.isInit).toBeFalsy()
    expect (fooTest(setIsInit(true)).isInit).toBeTruthy()
    expect(initialState.isFetching).toBeFalsy()
    expect (fooTest(setIsFetching(true)).isFetching).toBeTruthy()
    expect(initialState.isResponse).toBeFalsy()
    expect (fooTest(setResponse(true)).isResponse).toBeTruthy()
})
test("app-error after request in thunk should be filled", ()=>{
    expect(initialState.errorOfResponse).toBeNull()
    const editedState = appReducer(initialState, setAppError("some error"))
    expect(editedState.errorOfResponse).toEqual("some error")
})
