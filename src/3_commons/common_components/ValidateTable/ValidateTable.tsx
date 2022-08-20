import React, { useCallback, useState } from "react";
import { AppThunk, useAppDispatch } from "../../../2_BLL/store";
import commonClass from "../../classes/commonTable.module.css";
import Title from "../Title/Title";
import PacksUtils from "../../../4_components/Main/Packs/PacksUtils";
import Table from "../Table/Table";
import Paginator from "../Paginator/Paginator";
import ErrorResponse from "../ErrorResponse";
import { PackType } from "../../../1_DAL/packs-api";
import { CardType } from "../../../1_DAL/cards-api";
import CardsUtils from "../../../4_components/Main/Cards/CardsUtils";
import TableHeader from "../Table/TableHeader";

type ValidateTablePropsType = {
    min: number
    max: number
    setMin: (c: number) => void
    setMax: (c: number) => void
    cards?: boolean
    page: number
    title: string
    setPageCallback: (page: number) => void
    addThunk: (title: string) => AppThunk
    deleteThunk: (id: string) => AppThunk
    editThunk: (id: string, newTitle: string) => AppThunk
    getThunk?: (id: string) => AppThunk
    collection: Array<PackType> | Array<CardType>
    quantityValue: number,
    errorOfResponse: string | null
    headers: [string, string, string, string]

}
export const ValidateTable: React.FC<ValidateTablePropsType> = ({
    page,
    addThunk,
    deleteThunk,
    getThunk,
    title,
    editThunk,
    collection,
    cards,
    quantityValue,
    errorOfResponse,
    headers,
    setPageCallback,
    ...rangeParams
}) => {
    const dispatch = useAppDispatch()
    const [inputError, setInputError] = useState<string | null>("")

    const addValueCallback = useCallback((title: string) => {
        if (title.trim() === "" || title.length < 1 || title.length > 40) {
            setInputError("value must be more 1 or less 40 symbols")
        } else {
            setInputError(null)
            dispatch(addThunk(title))
        }
    }, [dispatch, addThunk])
    const deleteValueCallback = useCallback((id: string) => {
        dispatch(deleteThunk(id))
    }, [dispatch, deleteThunk])
    const editValueCallback = (useCallback((id: string, newTitle: string) => {
        dispatch(editThunk(id, newTitle)
        )
    }, [dispatch, editThunk]))
    const getValueCallback = useCallback((id: string) => {
        getThunk && dispatch(getThunk(id))
    }, [dispatch, getThunk])

    return (
        <div className={commonClass.table}>
            <Title title={title} />
            {cards ? <CardsUtils inputError={inputError} addCard={addValueCallback} /> :
                <PacksUtils {...rangeParams} inputError={inputError} addPack={addValueCallback} />}
            <TableHeader headers={headers} />
            <Table
                getCallback={getValueCallback}
                cards={cards}
                collection={collection}
                editCallback={editValueCallback}
                deleteCallback={deleteValueCallback} />
            <Paginator page={page}
                quantityValue={quantityValue}
                onClickPage={setPageCallback} />
            <ErrorResponse errorOfResponse={errorOfResponse} />
        </div>
    )
}