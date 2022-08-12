import {GetPacksResponseType, packsApi, PackType} from "../1_DAL/packs-api";
import {numberInit} from "../3_commons/init-variables";
import {AppThunk} from "./store";
import {setIsFetching} from "../3_commons/common_actions/common_actions";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";

export type PacksStateType = GetPacksResponseType
let initialState: PacksStateType = {
    cardPacks: [],
    cardPacksTotalCount: numberInit,
    maxCardsCount: numberInit,
    minCardsCount: numberInit,
    page: 1,
    pageCount: 8,
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksReducerType): PacksStateType => {
    switch (action.type) {
        case "SET-PACKS":
            return {...state, cardPacks: action.cardPacks}
        case "SET-PAGE-PACKS":
            return {...state, page: action.page}
        default:
            return state
    }
}

//types
export type PacksReducerType = ReturnType<typeof setPacks>
    | SetPagePackType
export type SetPagePackType = ReturnType<typeof setPagePacks>
//actions
const setPacks = (cardPacks: Array<PackType>) => ({type: "SET-PACKS", cardPacks} as const)
export const setPagePacks = (page: number) => ({type: "SET-PAGE-PACKS", page} as const)

//thunks
export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    try {
        const {_id} = getState().app.profile
        const {pageCount} = getState().packs
        const {page} = getState().packs
        dispatch(setIsFetching(true))
        const response = await packsApi.getPacks({_id, pageCount, page})
        dispatch(setPacks(response.data.cardPacks))
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
        await packsApi.editPack({cardsPack: {_id, name}})
        await dispatch(getPacksTC())
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}