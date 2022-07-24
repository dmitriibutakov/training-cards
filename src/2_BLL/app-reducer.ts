type AppType = {
}

let initialState: AppType = {
}

const AppReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
};

export type AppReducerType = SetAppErrorActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export default AppReducer;