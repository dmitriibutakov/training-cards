import {packsApi, PackType} from "../1_DAL/packs-api";
import {numberInit, stringInit} from "../3_commons/init-variables";
import {AppThunk} from "./store";
import {setIsFetching} from "../3_commons/common_actions/common_actions";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";

export type PacksStateType = {
    cardPacks: Array<PackType>
}
let initialState: PacksStateType = {
    cardPacks: [
        {
            _id: stringInit,
            user_id: stringInit,
            name: stringInit,
            cardsCount: numberInit,
            created: stringInit,
            updated: stringInit
        }
    ]
}

export const packsReducer = (state: PacksStateType = initialState, action: PacksReducerType): PacksStateType => {
    switch (action.type) {
        case "SET-PACKS":
            return {...state, cardPacks: action.cardPacks}
        case "ADD-NEW-PACK":
            return {...state, cardPacks: [...state.cardPacks, action.pack]}
        default:
            return state
    }
}

//types
export type PacksReducerType = SetPacksType | AddNewPackType
type SetPacksType = ReturnType<typeof setPacks>
type AddNewPackType = ReturnType<typeof addNewPack>

//actions
const setPacks = (cardPacks: Array<PackType>) => ({type: "SET-PACKS", cardPacks} as const)
const addNewPack = (pack: PackType) => ({type: "ADD-NEW-PACK", pack} as const)

//thunks
export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    const userId = getState().app.profile._id
    const pack = {userId, pageCount: 8}
    try {
        dispatch(setIsFetching(true))
        const response = await packsApi.getPacks(pack)
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
        const response = await packsApi.createPack(name)
        await dispatch(getPacksTC())
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}