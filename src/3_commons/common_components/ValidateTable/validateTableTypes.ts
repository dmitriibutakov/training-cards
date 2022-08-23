import {AppThunk} from "../../../2_BLL/store";
import {PackType} from "../../../1_DAL/packs-api";
import {CardType} from "../../../1_DAL/cards-api";

export type ValidateTablePropsType = {
    min?: number
    max?: number
    setMin?: (count: number) => void
    setMax?: (count: number) => void
    searchParams: string
    setSearchParams: (params: string) => void
    valueId: string
    setValueId: (id: string) => void
    isCards?: boolean
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
    headers: string[]
    pageCount: number
}
