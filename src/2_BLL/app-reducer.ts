type AppType = {
}

let initialState: AppType = {
}

const AppReducer = (state: AppType = initialState, action: AppReducerType): AppType => {
    switch (action.type) {
        default:
            return state
    }
};

export type AppReducerType = any


export default AppReducer;