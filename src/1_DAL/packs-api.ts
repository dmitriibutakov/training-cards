import {instanceHeroku} from "./instance";

export const packsApi = {
    getPacks: ({min, max, _id, sortPacks, page, pageCount}: PackParamType) =>
        instanceHeroku.get<GetPacksResponseType>
        (`cards/pack?packName?=english&min=${min}&max=${max}&sortPacks?=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${_id}`),
    createPack: (name?: string) => instanceHeroku.post<{ newCardsPack: PackType }>("cards/pack", {cardsPack: {name}}),
    deletePack: (id: string) => instanceHeroku.delete<{ deletedCardsPack: PackType }>("cards/pack", {params: {id}}),
    editPack: (pack: UpdateCardsPackType) => instanceHeroku.put<{ updatedCardsPack: PackType }>("cards/pack", pack),
}

//types packs
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
    answer?: string
    question?: string
    grade?: number
    shots?: number
}
export type GetPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type UpdateCardsPackType = {
    cardsPack: PackEditType;
};
type PackEditType = {
    _id: string;
    name: string;
    deckCover?: string;
    private?: boolean;
};

