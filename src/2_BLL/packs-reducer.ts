import { GetPacksResponseType, PackParamType, packsApi, PackType } from "../1_DAL/packs-api";
import { numberInit } from "../3_commons/init-variables";
import { AppThunk } from "./store";
import { setIsFetching } from "../3_commons/actions/common_actions";
import { errorUtils } from "../3_commons/errors-utils";
import { AxiosError } from "axios";

export type PacksStateType = GetPacksResponseType
let initialState: PacksStateType = {
    cardPacks: [],
    cardPacksTotalCount: numberInit,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 8,
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksReducerType): PacksStateType => {
    switch (action.type) {
        case "SET-PACKS":
        case "SET-PAGE-PACKS":
        case "SET-PACKS-COUNT":
        case "SET-MAX-CARDS-COUNT":
        case "SET-MIN-CARDS-COUNT":
            return { ...state, ...action }
        default:
            return state
    }
}

//types
export type PacksReducerType = ReturnType<typeof setPacks>
    | ReturnType<typeof setPacksTotalCount>
    | ReturnType<typeof setPagePacks> | ReturnType<typeof setMaxCardsCount> | ReturnType<typeof setMinCardsCount>



//actions
const setPacks = (cardPacks: Array<PackType>) => ({ type: "SET-PACKS", cardPacks } as const)
const setPacksTotalCount = (cardPacksTotalCount: number) => ({ type: "SET-PACKS-COUNT", cardPacksTotalCount } as const)
export const setPagePacks = (page: number) => ({ type: "SET-PAGE-PACKS", page } as const)
export const setMaxCardsCount = (maxCardsCount: number) => ({ type: "SET-MAX-CARDS-COUNT", maxCardsCount } as const)
export const setMinCardsCount = (minCardsCount: number) => ({ type: "SET-MIN-CARDS-COUNT", minCardsCount } as const)

//thunks
export const getPacksTC = (params?: PackParamType): AppThunk => async (dispatch, getState) => {
    try {
        const { _id } = getState().app.profile
        const { pageCount } = getState().packs
        const { page } = getState().packs
        const { maxCardsCount } = getState().packs
        const { minCardsCount } = getState().packs
        dispatch(setIsFetching(true))
        const response = await packsApi.getPacks({ _id, pageCount, page, min: minCardsCount, max: maxCardsCount, ...params  })
        dispatch(setPacks(response.data.cardPacks))
        dispatch(setPacksTotalCount(response.data.cardPacksTotalCount))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const addPackTC = (name?: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        await packsApi.createPack(name)
        await dispatch(getPacksTC())
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const deletePackTC = (id: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        await packsApi.deletePack(id)
        await dispatch(getPacksTC())
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const editPackTC = (_id: string, name: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        await packsApi.editPack({ cardsPack: { _id, name } })
        await dispatch(getPacksTC())
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
