import React, {useCallback, useState} from "react";
import {AppThunk, useAppDispatch} from "../../../2_BLL/store";
import commonClass from "../../classes/commonTable.module.css";
import Title from "../Title/Title";
import Table from "./Table/Table";
import Paginator from "../Paginator/Paginator";
import ErrorResponse from "../ErrorResponse";
import {PackType} from "../../../1_DAL/packs-api";
import {CardType} from "../../../1_DAL/cards-api";
import TableHeader from "./Table/TableHeader";
import Utils from "../Utils/Utils";
import Modal from "../Modal/Modal";
import {useNavigate} from "react-router-dom";
import {images} from "../../images/commonImages";
import {ModalStatusesTypes} from "../../validates/validates";

type ValidateTablePropsType = {
    min: number
    max: number
    setMin: (c: number) => void
    setMax: (c: number) => void
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

export const ValidateTable: React.FC<ValidateTablePropsType> = ({
                                                                    page,
                                                                    pageCount,
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
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState<ModalStatusesTypes>("hidden")
    const [valueId, setValueId] = useState("")

    const addThunkCallback = useCallback((value: string, answer?: string) => {
        cards ? dispatch(addThunk(value, answer)) : dispatch(addThunk(value))
    }, [cards, dispatch, addThunk])

    const deleteThunkCallback = useCallback((id: string) => {
        dispatch(deleteThunk(id))
    }, [dispatch, deleteThunk])

    const editThunkCallback = (useCallback((id: string, value: string, answer?: string) => {
        dispatch(editThunk(id, value, answer))
    }, [dispatch, editThunk]))

    /*    const getValueCallback = useCallback((id: string) => {
            getThunk && dispatch(getThunk(id))
        }, [dispatch, getThunk])*/

    return (
        <div className={commonClass.table}>
            {cards && <button className={commonClass.btn__navigate}
                              onClick={() => (navigate("/packs"))}>
                <img src={images.backImg} alt="to-back"/>
            </button>}
            <Title title={title}/>
            <Utils setShowModal={setShowModal} cards={cards} {...rangeParams}/>
            <TableHeader headers={headers}/>
            <Table
                setValueId={setValueId}
                cards={cards}
                setShowModal={setShowModal}
                collection={collection}
            />
            <Paginator pageSize={8}
                       currentPage={page}
                       portionSize={pageCount}
                       quantityValue={quantityValue}
                       onClickCallback={setPageCallback}/>

            <ErrorResponse errorOfResponse={errorOfResponse}/>

            {showModal !== "hidden" && <Modal
                editCallback={editThunkCallback}
                deleteCallback={deleteThunkCallback}
                addCallback={addThunkCallback}
                valueId={valueId}
                showModal={showModal}
                setShowModal={setShowModal}
                cards={cards}/>}
        </div>
    )
}