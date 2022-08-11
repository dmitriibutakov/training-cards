import {instanceHeroku} from "./instance";

export const packsApi = {
    getPacks: ({min, max, _id, sortPacks, page, pageCount}: PackParamType) =>
        instanceHeroku.get<ResponseGetCardsType>(`cards/pack?packName?=english&min?=${min}&max?=${max}&sortPacks?=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${_id}`),
    createPack: (name?: string) => instanceHeroku.post("cards/pack", {cardsPack: {name}}),
    deletePack: (id: string) => instanceHeroku.delete("cards/pack", {params:{id}}),
    editPack: (id: string, name?: string) => instanceHeroku.put("cards/pack", {params: {id, name}}),
}
export type PackParamType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    _id?: string
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