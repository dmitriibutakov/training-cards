import {instanceHeroku} from "./instance";

export const packsApi = {
    getPacks: ({min, max, _id, sortPacks, page, pageCount}: PackParamType) =>
        instanceHeroku.get<ResponseGetCardsType>
        (`cards/pack?packName?=english&min?=${min}&max?=${max}&sortPacks?=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${_id}`),
    createPack: (name?: string) => instanceHeroku.post<{ newCardsPack: CardType }>("cards/pack", {cardsPack: {name}}),
    deletePack: (id: string) => instanceHeroku.delete<{ deletedCardsPack: CardType }>("cards/pack", {params: {id}}),
    editPack: (pack: UpdateCardsPackType) => instanceHeroku.put<{ updatedCardsPack: CardType }>("cards/pack", pack),
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
export type CardType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover?: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
};

export type UpdateCardsPackType = {
    cardsPack: CardsPackType;
};

type CardsPackType = {
    _id: string;
    name: string;
    deckCover?: string;
    private?: boolean;
};

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

