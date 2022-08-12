import {AppThunk} from "./store";
import {setIsFetching} from "../3_commons/common_actions/common_actions";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";
import {cardsApi, CardType, GetCardsResponseType} from "../1_DAL/cards-api";
import {numberInit, stringInit} from "../3_commons/init-variables";

type InitialStateType = GetCardsResponseType
const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: numberInit,
    page: 1,
    pageCount: 8,
    maxGrade: numberInit,
    minGrade: numberInit,
    packUserId: stringInit
};

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS":
            return {...state, cards: action.cards}
        case "SET-PAGE-CARDS":
            return {...state, page: action.page}
        case "SET-CARD-PACK-ID":
            return {...state, packUserId: action.id}
        default:
            return state
    }
}

//types
export type CardsReducerType = ReturnType<typeof setCards>
    | SetPageCardsType | ReturnType<typeof setCardPackId>
export type SetPageCardsType = ReturnType<typeof setPageCards>

//actions
const setCards = (cards: Array<CardType>) => ({type: "SET-CARDS", cards} as const)
export const setPageCards = (page: number) => ({type: "SET-PAGE-CARDS", page} as const)
export const setCardPackId = (id: string) => ({type: "SET-CARD-PACK-ID", id} as const)

//thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => async (dispatch, getState) => {
    try {
        const {page} = getState().cards
        const {pageCount} = getState().cards
        dispatch(setIsFetching(true))
        dispatch(setCardPackId(cardsPack_id))
        const response = await cardsApi.getCards({cardsPack_id, page, pageCount})
        dispatch(setCards(response.data.cards))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const addCardTC = (cardQuestion?: string): AppThunk => async (dispatch, getState) => {
    const {packUserId} = getState().cards
    try {
        dispatch(setIsFetching(true))
        await cardsApi.createCard({cardQuestion, cardsPack_id: packUserId})
        await dispatch(getCardsTC(packUserId))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const deleteCardTC = (id: string): AppThunk => async (dispatch, getState) => {
    const {packUserId} = getState().cards
    try {
        dispatch(setIsFetching(true))
        await cardsApi.deleteCard(id)
        await dispatch(getCardsTC(packUserId))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const editCardTC = (_id: string, question: string): AppThunk => async (dispatch, getState) => {
    const {packUserId} = getState().cards
    try {
        dispatch(setIsFetching(true))
        await cardsApi.editCard({card: {_id, question}})
        await dispatch(getCardsTC(packUserId))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}