import {AppThunk} from "../../../2_BLL/store";
import {PackType} from "../../../1_DAL/packs-api";
import {CardType} from "../../../1_DAL/cards-api";

export type ValidateTablePropsType = {
    isCards?: boolean
    min?: number
    max?: number
    page: number
    quantityValue: number
    pageCount: number
    searchParams: string
    valueId: string
    title: string
    setMin?: (count: number) => void
    setMax?: (count: number) => void
    setPageCallback: (page: number) => void
    setSearchParams: (params: string) => void
    setValueId: (id: string) => void
    collection: Array<PackType> | Array<CardType>
    errorOfResponse: string | null
    headers: string[]
    addThunk: (value: string, description?: string) => AppThunk
    deleteThunk: (id: string) => AppThunk
    editThunk: (id: string, question: string, comments?: string) => AppThunk
    getThunk?: (id: string) => AppThunk

}
