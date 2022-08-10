import {instanceHeroku} from "./instance";

export const packsApi = {
    getPacks: ({
                   packName, min, max, userId,
                   sortPacks, page, pageCount
               }: PackParamType) =>
        instanceHeroku.get<ResponseGetCardsType>(`cards/pack?packName?=${packName}&min?=${min}&max?=${max}&sortPacks?=${sortPacks}&page?=${page}&pageCount=${pageCount}&user_id=${userId}`),
    createPack: (name?: string) => instanceHeroku.post("cards/pack", {cardsPack: {name}})
}
export type PackParamType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    userId?: string
}
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
export type ResponseGetCardsType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}