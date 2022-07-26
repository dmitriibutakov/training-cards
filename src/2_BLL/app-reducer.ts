type AppType = {
    error: string | null
}

let initialState: AppType = {
    error: ''
}

const appReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
};

export type AppReducerType = SetAppErrorActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string) => ({type: 'SET-ERROR', error} as const)

export default appReducer;