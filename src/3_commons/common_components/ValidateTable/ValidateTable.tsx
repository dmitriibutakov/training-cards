import React, {useCallback, useState} from "react";
import commonClass from "../../classes/commonTable.module.css"
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import Title from "../Title/Title";
import Table from "./Table/Table";
import Paginator from "../Paginator/Paginator";
import ErrorResponse from "../ErrorResponse";
import TableHeader from "./Table/TableHeader";
import Utils from "../Utils/Utils";
import Modal from "../Utils/Modal/Modal";
import {useNavigate} from "react-router-dom";
import {images} from "../../images/commonImages";
import {ModalStatusesTypes} from "../../validates/validates";
import Preloader from "../Preloader/Preloader";
import {Fade} from "../../animations";
import {ValidateTablePropsType} from "./validateTableTypes";

export const ValidateTable: React.FC<ValidateTablePropsType> = ({
                                                                    page, pageCount,
                                                                    addThunk, deleteThunk,
                                                                    getThunk, title,
                                                                    editThunk, collection,
                                                                    isCards, quantityValue,
                                                                    errorOfResponse, headers,
                                                                    valueId, setValueId,
                                                                    setPageCallback, ...validateParams
                                                                }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isFetching} = useAppSelector(state => state.app)
    const [showModal, setShowModal] = useState<ModalStatusesTypes>("hidden")

    const addThunkCallback = useCallback((value: string, answer?: string) => {
        isCards ? dispatch(addThunk(value, answer)) : dispatch(addThunk(value))
        setShowModal("hidden")
    }, [isCards, dispatch, addThunk])

    const deleteThunkCallback = useCallback((id: string) => {
        dispatch(deleteThunk(id))
        setShowModal("hidden")
    }, [dispatch, deleteThunk])

    const editThunkCallback = (useCallback((id: string, value: string, answer?: string) => {
        dispatch(editThunk(id, value, answer))
        setShowModal("hidden")
    }, [dispatch, editThunk]))

    if (isFetching) return <Preloader/>
    return (
        <Fade delay={100} effect={"fadeInUp"}>
            <div className={commonClass.table}>
                {isCards && <button className={commonClass.btn__navigate}
                                  onClick={() => (navigate("/packs"))}>
                    <img src={images.backImg} alt="to-back"/>
                </button>}
                <Title title={title}/>
                <Utils setShowModal={setShowModal} isCards={isCards} {...validateParams}/>
                <TableHeader isCards={isCards} headers={headers}/>
                <Table
                    searchParams={validateParams.searchParams}
                    setValueId={setValueId}
                    isCards={isCards}
                    setShowModal={setShowModal}
                    collection={collection}
                />
                <Paginator pageSize={pageCount}
                           currentPage={page}
                           portionSize={5}
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
                    isCards={isCards}/>}
            </div>
        </Fade>
    )
}