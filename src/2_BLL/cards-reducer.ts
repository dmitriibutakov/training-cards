import {AppThunk} from "./store";
import {setIsFetching} from "../3_commons/actions/common_actions";
import {errorUtils} from "../3_commons/errors-utils";
import {AxiosError} from "axios";
import {cardsApi, CardType, GetCardsResponseType, UpdatedGradeType} from "../1_DAL/cards-api";
import {numberInit, stringInit, undefinedRandomCard} from "../3_commons/init-variables";
import {getCard} from "../3_commons/validates/random";

type InitialStateType = GetCardsResponseType
const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: numberInit,
    page: 1,
    pageCount: 4,
    maxGrade: numberInit,
    minGrade: numberInit,
    packUserId: stringInit,
    randomCard: undefinedRandomCard,
    loadingModal: false
};

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerType): InitialStateType => {
    switch (action.type) {
        case "SET-CARDS-COLLECTION":
        case "SET-PAGE-CARDS":
        case "SET-PACK-USER-ID":
        case "SET-CARDS-TOTAL-COUNT":
        case "SET-RANDOM-CARD":
        case "SET-LOADING-MODAL":
            return {...state, ...action}
        case "SET-CHANGE-GRADE-CARDS":
            return {
                ...state, ...state.cards.map(el => el._id === action.card._id ? {
                    ...el,
                    grade: action.card.grade
                } : el)
            }
        default:
            return state
    }
}

//types
export type CardsReducerType =
    ReturnType<typeof setCardsCollection>
    | ReturnType<typeof setPageCards>
    | ReturnType<typeof setPackUserId>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setRandomCard>
    | ReturnType<typeof setLoadingModal>
    | ReturnType<typeof setChangeGradeCards>

//actions
const setCardsCollection = (cards: Array<CardType>) => ({type: "SET-CARDS-COLLECTION", cards} as const)
const setCardsTotalCount = (cardsTotalCount: number) => ({type: "SET-CARDS-TOTAL-COUNT", cardsTotalCount} as const)
export const setPageCards = (page: number) => ({type: "SET-PAGE-CARDS", page} as const)
export const setPackUserId = (packUserId: string) => ({type: "SET-PACK-USER-ID", packUserId} as const)
const setRandomCard = (randomCard: CardType) => ({type: "SET-RANDOM-CARD", randomCard} as const)
const setLoadingModal = (loadingModal: boolean) => ({type: "SET-LOADING-MODAL", loadingModal} as const)
const setChangeGradeCards = (card: UpdatedGradeType) => ({type: "SET-CHANGE-GRADE-CARDS", card} as const)

//thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => async (dispatch, getState) => {
    dispatch(setIsFetching(true))
    try {
        const {page} = getState().cards
        const {pageCount} = getState().cards
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
        await cardsApi.createCard({question, answer, cardsPack_id: packUserId})
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

export const getRandomCardTC = (): AppThunk => async (dispatch, getState) => {
    const cardsPack_id = getState().cards.packUserId
    try {
        dispatch(setLoadingModal(true))
        const response = await cardsApi.getCards({cardsPack_id})
        const randomCard = getCard(response.data.cards)
        dispatch(setRandomCard(randomCard))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setLoadingModal(false))
    }
}

export const gradeCardTC = (grade: number): AppThunk => async (dispatch, getState) => {
    const {_id} = getState().cards.randomCard
    try {
        dispatch(setLoadingModal(true))
        const response = await cardsApi.gradeCard({grade, card_id: _id})
        dispatch(setChangeGradeCards(response.data.updatedGrade))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setLoadingModal(false))
    }

}