
type AppType = {
    errorOfResponse: string | null
}

let initialState: AppType = {
    errorOfResponse: null
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
            return {...state, errorOfResponse: action.errorOfResponse}
        default:
            return state
    }
};

export type AppReducerType = SetAppErrorActionType
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export const setAppError = (errorOfResponse: string) => ({type: 'SET-ERROR', errorOfResponse} as const)

export default appReducer;