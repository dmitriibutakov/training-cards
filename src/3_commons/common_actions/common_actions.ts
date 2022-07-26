
export type SetIsFetchingType = ReturnType<typeof setIsFetching>
export const setIsFetching = (isFetching: boolean) => {return {type: "SET-IS-FETCHING", isFetching} as const}
