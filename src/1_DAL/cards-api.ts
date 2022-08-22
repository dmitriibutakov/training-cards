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
    editCard: (card: UpdateCardType) => instanceHeroku.put<{ updatedCard: CardType }>("cards/card", card)
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
    shots: 1
    rating: number
    user_id: string
    created: string
    updated: string
    _id: string
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
};
export type UpdateCardType = {
    card: CardEditType
}
type CardEditType = {
    _id: string
    question?: string
    answer?: string
}