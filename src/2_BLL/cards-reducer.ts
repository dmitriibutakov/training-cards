import {AppThunk} from "./store";
import {setIsFetching} from "../3_commons/actions/common_actions";
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
        case "SET-CARDS-COLLECTION":
        case "SET-PAGE-CARDS":
        case "SET-PACK-USER-ID":
        case "SET-CARDS-TOTAL-COUNT":
            return {...state, ...action}
        default:
            return state
    }
}

//types
export type CardsReducerType = ReturnType<typeof setCardsCollection>
    | ReturnType<typeof setPageCards>
    | ReturnType<typeof setPackUserId>
    | ReturnType<typeof setCardsTotalCount>

//actions
const setCardsCollection = (cards: Array<CardType>) => ({type: "SET-CARDS-COLLECTION", cards} as const)
const setCardsTotalCount = (cardsTotalCount: number) => ({type: "SET-CARDS-TOTAL-COUNT", cardsTotalCount} as const)
export const setPageCards = (page: number) => ({type: "SET-PAGE-CARDS", page} as const)
export const setPackUserId = (packUserId: string) => ({type: "SET-PACK-USER-ID", packUserId} as const)

//thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => async (dispatch, getState) => {
    try {
        const {page} = getState().cards
        const {pageCount} = getState().cards
        dispatch(setIsFetching(true))
        dispatch(setPackUserId(cardsPack_id))
        const response = await cardsApi.getCards({cardsPack_id, page, pageCount})
        dispatch(setCardsCollection(response.data.cards))
        dispatch(setCardsTotalCount(response.data.cardsTotalCount))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const addCardTC = (question: string, answer?: string): AppThunk => async (dispatch, getState) => {
    const {packUserId} = getState().cards
    try {
        dispatch(setIsFetching(true))
        await cardsApi.createCard({question,answer, cardsPack_id: packUserId})
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
export const editCardTC = (_id: string, question: string, answer?: string): AppThunk => async (dispatch, getState) => {
    const {packUserId} = getState().cards
    try {
        dispatch(setIsFetching(true))
        await cardsApi.editCard({card: {_id, question, answer}})
        await dispatch(getCardsTC(packUserId))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setIsFetching(false))
    }
}