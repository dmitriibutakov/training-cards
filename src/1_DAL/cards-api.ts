import {instanceHeroku} from "./instance";
import {PackType} from "./packs-api";

export const cardsApi = {
    getCards: ({
                   answer,
                   question,
                   cardsPack_id,
                   min, max,
                   page, pageCount
               }: CardParamType) => instanceHeroku.get<GetCardsResponseType>("cards/card", {
        params: {
            answer,
            question,
            cardsPack_id,
            min, max,
            page, pageCount
        }
    }),
    createCard: ({
                     question,
                     answer,
                     cardsPack_id,
                 }: CardParamType) => instanceHeroku.post<{ newCard: CardType }>("cards/card", {
        card: {
            question,
            answer,
            cardsPack_id
        }
    }),
    deleteCard: (id: string) => instanceHeroku.delete<{ deletedCard: PackType }>("cards/card", {params: {id}}),
    editCard: (card: UpdateCardType) => instanceHeroku.put<{ updatedCard: CardType }>("cards/card", card),
    gradeCard: ({
                    grade,
                    card_id
                }: CardRateType) => instanceHeroku.put<{ updatedGrade: UpdatedGradeType }>("cards/grade", {
        grade,
        card_id
    })
}

//types cards
export type CardParamType = {
    answer?: string
    question?: string
    cardsPack_id: string
    min?: number
    max?: number
    page?: number
    pageCount?: number
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    rating: number
    user_id?: string
    created: string
    updated: string
    more_id?: string
    _id: string
    type?: string
    name?: string
    cardsCount?: number
};
export type GetCardsResponseType = {
    cards: CardType[];
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    packName?: string
    randomCard: CardType
    loadingModal?: boolean
};
export type UpdateCardType = {
    card: CardEditType
}
type CardEditType = {
    _id: string
    question?: string
    answer?: string
}
type CardRateType = {
    grade: number
    card_id: string
}
export type UpdatedGradeType = {
    _id: string
    cardsPack_id?: string
    card_id?: string
    user_id?: string
    grade: number
    shots: number
}