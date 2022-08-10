import React, {useCallback, useState} from 'react';
import commonClass from "../../../3_commons/common_classes/commonTable.module.css"
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import {addPackTC, setPage} from "../../../2_BLL/packs-reducer";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import PacksHeader from "./PacksHeader/PacksHeader";
import PacksTable from "./PacksTable/PacksTable";
import Preloader from "../../../3_commons/Preloader/Preloader";
import UniversalPaginator from "../../../3_commons/common_components/UniversalPaginator/UniversalPaginator";
import PacksUtils from "./PacksUtils/PacksUtils";


const Packs = () => {
    const dispatch = useAppDispatch()
    const {publicCardPacksCount} = useAppSelector(state => state.app.profile)
    const {isFetching} = useAppSelector(state => state.app)
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {pageCount} = useAppSelector(state => state.packs)
    const {cardPacks} = useAppSelector(state => state.packs)
    const {page} = useAppSelector(state=>state.packs)
    const [inputError, setInputError] = useState<string | null>("")
    const setPageHandler = (page: number) => {
        dispatch(setPage(page))
    }
    const addPack = useCallback(function (title: string) {
        if (title.length < 1 || title.length > 10) {
            setInputError("value must be more 1 or less 10 symbols")
        } else {
            setInputError(null)
            dispatch(addPackTC(title))
        }
    }, [])


    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <div className={commonClass.table}>
            <UniversalTitle title={"Training packs"}/>
            <PacksUtils inputError={inputError} addPack={addPack}/>
            <PacksTable cardPacks={cardPacks}/>
            <UniversalPaginator page={page} quantityValue={publicCardPacksCount / pageCount} onClickPage={setPageHandler}/>
        </div>
    );
};

export default Packs;