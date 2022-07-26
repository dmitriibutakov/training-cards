
type AppType = {
    errorResponse: string | null
}

let initialState: AppType = {
    errorResponse: ''
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
            return {...state, errorResponse: action.errorResponse}
        default:
            return state
    }
};

export type AppReducerType = SetAppErrorActionType
export type SetAppErrorActionType = ReturnType<typeof setAppError>
export const setAppError = (errorResponse: string) => ({type: 'SET-ERROR', errorResponse} as const)

export default appReducer;