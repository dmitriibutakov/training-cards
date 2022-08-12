import React, {useCallback, useState} from "react";
import {SetPageCardsType} from "../../../2_BLL/cards-reducer";
import {AppThunk, useAppDispatch} from "../../../2_BLL/store";
import {SetPagePackType} from "../../../2_BLL/packs-reducer";
import commonClass from "../../common_classes/commonTable.module.css";
import Title from "../Title/Title";
import PacksUtils from "../../../4_components/Main/Packs/PacksUtils/PacksUtils";
import Table from "../Table/Table";
import Paginator from "../Paginator/Paginator";
import ErrorResponse from "../ErrorResponse";
import {PackType} from "../../../1_DAL/packs-api";
import {CardType} from "../../../1_DAL/cards-api";
import CardsUtils from "../../../4_components/Main/Cards/CardsUtils/CardsUtils";

type ValidateTablePropsType = {
    cards?: boolean
    page: number
    title: string
    setPageActionCreator: (page: number) => SetPagePackType | SetPageCardsType
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
                                                                    setPageActionCreator,
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
                                                                    headers
                                                                }) => {
    const dispatch = useAppDispatch()
    const [inputError, setInputError] = useState<string | null>("")

    const setPageHandler = () => {
        dispatch(setPageActionCreator(page))
    }

    const addValueCallback = useCallback((title: string) => {
        if (title.length < 1 || title.length > 10) {
            setInputError("value must be more 1 or less 10 symbols")
        } else {
            setInputError(null)
            dispatch(addThunk(title))
        }
    }, [])
    const deleteValueCallback = useCallback((id: string) => {
        dispatch(deleteThunk(id))
    }, [])
    const editValueCallback = (useCallback((id: string, newTitle: string) => {
        dispatch(editThunk(id, newTitle)
        )
    }, []))
    const getValueCallback = useCallback((id: string) => {
       getThunk && dispatch(getThunk(id))
    }, [])

    return (
        <div className={commonClass.table}>
            <Title title={title}/>
            {cards ? <CardsUtils inputError={inputError} addCard={addValueCallback}/> :
                <PacksUtils inputError={inputError} addPack={addValueCallback}/>}
            <Table headers={headers}
                   getCallback={getValueCallback}
                   cards={cards}
                   collection={collection}
                   editCallback={editValueCallback}
                   deleteCallback={deleteValueCallback}/>
            <Paginator page={page}
                       quantityValue={quantityValue}
                       onClickPage={setPageHandler}/>
            <ErrorResponse errorOfResponse={errorOfResponse}/>
        </div>
    )
}