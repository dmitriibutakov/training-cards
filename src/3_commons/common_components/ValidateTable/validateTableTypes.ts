import {AppThunk} from "../../../2_BLL/store";
import {PackType} from "../../../1_DAL/packs-api";
import {CardType} from "../../../1_DAL/cards-api";

export type ValidateTablePropsType = {
    min: number
    max: number
    setMin: (c: number) => void
    setMax: (c: number) => void
    searchParams: string
    setSearchParams: (params: string) => void
    valueId: string
    setValueId: (id: string) => void
    cards?: boolean
    page: number
    title: string
    setPageCallback: (page: number) => void
    addThunk: (value: string, description?: string) => AppThunk
    deleteThunk: (id: string) => AppThunk
    editThunk: (id: string, question: string, comments?: string) => AppThunk
    getThunk?: (id: string) => AppThunk
    collection: Array<PackType> | Array<CardType>
    quantityValue: number,
    errorOfResponse: string | null
    headers: [string, string, string, string]
    pageCount: number
}
