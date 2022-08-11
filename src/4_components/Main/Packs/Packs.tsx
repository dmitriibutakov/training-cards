import React, {useCallback, useState} from 'react';
import commonClass from "../../../3_commons/common_classes/commonTable.module.css"
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import {addPackTC, deletePackTC, editPackTC, setPage} from "../../../2_BLL/packs-reducer";
import Title from "../../../3_commons/common_components/Title/Title";
import Table from "../../../3_commons/common_components/Table/Table";
import Preloader from "../../../3_commons/Preloader/Preloader";
import Paginator from "../../../3_commons/common_components/Paginator/Paginator";
import PacksUtils from "./PacksUtils/PacksUtils";
import ErrorResponse from "../../../3_commons/common_components/ErrorResponse";


const Packs = () => {
    const dispatch = useAppDispatch()
    const {publicCardPacksCount} = useAppSelector(state => state.app.profile)
    const {isFetching} = useAppSelector(state => state.app)
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {pageCount} = useAppSelector(state => state.packs)
    const {cardPacks} = useAppSelector(state => state.packs)
    const {page} = useAppSelector(state => state.packs)
    const {errorOfResponse} = useAppSelector(state => state.app)
    const [inputError, setInputError] = useState<string | null>("")
    const setPageHandler = (page: number) => {
        dispatch(setPage(page))
    }

    const addPackCallback = useCallback((title: string) => {
        if (title.length < 1 || title.length > 10) {
            setInputError("value must be more 1 or less 10 symbols")
        } else {
            setInputError(null)
            dispatch(addPackTC(title))
        }
    }, [])
    const deletePackCallback = useCallback((id: string) => {
        dispatch(deletePackTC(id))
    }, [])
    const editPackCallback = (useCallback((id: string, newTitle: string) => {
        dispatch(editPackTC(id, newTitle)
        )
    }, []))

    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <div className={commonClass.table}>
            <Title title={"Packs list"}/>
            <PacksUtils inputError={inputError} addPack={addPackCallback}/>
            <Table headers={["Name", "Quantity cards", "Last update", "Actions"]}
                   collection={cardPacks}
                   editCallback={editPackCallback}
                   deleteCallback={deletePackCallback}/>
            <Paginator page={page}
                       quantityValue={publicCardPacksCount / pageCount}
                       onClickPage={setPageHandler}/>
            <ErrorResponse errorOfResponse={errorOfResponse}/>
        </div>
    );
};

export default Packs;